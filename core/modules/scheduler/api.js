'use strict'

const async = require('async')
const cron = require('node-cron')
const Emailer = require('../emailer/schema')
const Campaign = require('../campaign/schema')
const Scenario = require('../scenario/schema')
const emailer_model = require('../emailer/api')
const { arrayToObject } = require('../../utils/helper')

module.exports.scheduler = function (_cb) {
  async.auto({
    list_active_campaigns: (cb) => {
      let today = new Date()

      Campaign.find({
        start_date: { '$lte': today },
        end_date: { '$gte': today }
      })
        .then((campaigns) => {
          if (campaigns.length) {
            return cb(null, { campaigns })
          }

          return _cb(null, { code: 'NO_ACTIVE_CAMPAIGNS' })
        })
        .catch((err) => {
          console.log(err)

          return _cb(err)
        })
    },
    list_scenarios_scheduled_for_today_of_active_campaigns: ['list_active_campaigns', (result, cb) => {
      let campaigns = result.list_active_campaigns.campaigns
      let campaigns_by_campaign_id = arrayToObject(campaigns, '_id')
      let all_active_campaign_keys = Object.keys(campaigns_by_campaign_id)

      Scenario.find({
        campaign_id: {
          $in: all_active_campaign_keys
        },
        // date: {
        //   '$eq': new Date()
        // }
      })
        .then((scenarios) => {
          return cb(null, { scenarios })
        })
        .catch((err) => {
          return _cb(err)
        })
    }],
    check_for_scheduled_scenarios: ['list_scenarios_scheduled_for_today_of_active_campaigns', (result, cb) => {
      let scenarios = result.list_scenarios_scheduled_for_today_of_active_campaigns.scenarios

      if (scenarios.length) {
        return cb(null, { scenarios })
      }

      return _cb(null, { code: 'NO_SCENARIOS_FOR_TODAY' })
    }],
    schedule_emailer_for_each_scenario: [
      'list_active_campaigns',
      'check_for_scheduled_scenarios',
      'list_scenarios_scheduled_for_today_of_active_campaigns', (result, cb) => {

        let scenarios = result.list_scenarios_scheduled_for_today_of_active_campaigns.scenarios

        async.mapSeries(scenarios, (scenario, callback) => {

          async.auto({
            get_campaign_obj: (cb) => {
              let campaigns = result.list_active_campaigns.campaigns
              let campaigns_by_campaign_id = arrayToObject(campaigns, '_id')
              let campaign_obj = campaigns_by_campaign_id[scenario.campaign_id]

              return cb(null, { campaign_obj })
            },
            get_batch_id: ['get_campaign_obj', (result, cb) => {
              let campaign_obj = result.get_campaign_obj.campaign_obj
              let batch_id = campaign_obj.batch_id;

              return cb(null, { batch_id })
            }],
            insert_into_emailer_table: [
              'get_batch_id',
              'get_campaign_obj', (result, cb) => {
                let batch_id = result.get_batch_id.batch_id
                let campaign_obj = result.get_campaign_obj.campaign_obj

                new Emailer({
                  batch_id: batch_id,
                  scenario_id: scenario._id,
                  scheduled_at: scenario.time,
                  campaign_id: campaign_obj._id,
                })
                  .save()
                  .then((emailer) => {
                    return cb(null, { emailer_id: emailer._id })
                  })
                  .catch((err) => {
                    console.log(err)
                    return cb({ code: 'INSERT_INTO_EMAILER_ERROR' })
                  })
              }],
            schedule_emailer: ['insert_into_emailer_table', (result, cb) => {
              let emailer_id = result.insert_into_emailer_table.emailer_id
              let time = scenario.time.split(':');

              let at_hour = time[0]
              let at_minute = time[1]

              cron.schedule(`${at_minute} ${at_hour} * * *`, () => {
                emailer_model.send({ emailer_id: emailer_id }, (err, result) => {
                  if (err) {
                    console.log(err)
                  }

                  console.log(result)
                })
              })

              return cb(null, { scheduled_at: time })
            }],

          }, (err, result) => {
            if (err) return callback(err)

            return callback(null, {})
          })

        }, (err, all_scenarios) => {
          if (err) return cb(err)

          return cb(null, {})
        })
      }]

  }, function (error, results) {

    if (error) {
      return _cb({ code: 'ERROR_SCHEDULING', message: error })
    }

    return _cb(null, { code: 'EMAILER_SCHEDULE_TASK_SUCCESS' })
  })
}