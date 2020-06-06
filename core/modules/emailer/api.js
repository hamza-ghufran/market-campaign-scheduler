const Emailer = require('./schema')
const Batch = require('../batch/schema')
const Contacts = require('../contacts/schema')
const Scenario = require('../scenario/schema')

module.exports.send = function (data, cb) {

  let emailer_id = data.emailer_id

  async.auto({
    get_emailer_obj: (cb) => {
      Emailer.find({
        _id: emailer_id
      })
        .then((emailer) => {
          return cb(null, { emailer })
        })
        .catch((err) => {
          return cb({ code: 'GET_EMAILER_ERROR' })
        })
    },
    get_batch_obj: ['get_emailer_obj', (result, cb) => {
      let emailer_obj = result.get_emailer_obj.emailer
      let batch_id = emailer_obj.batch_id

      Batch.findById(batch_id)
        .then((batch) => {
          return cb(null, { batch })
        })
        .catch((err) => {
          return cb({ code: 'GET_BACH_ERROR' })
        })
    }],
    get_scenario_obj: ['get_batch_obj', 'get_emailer_obj', (result, cb) => {
      let emailer_obj = result.get_emailer_obj.emailer
      let scenario_id = emailer_obj.scenario_id

      Scenario.findById(scenario_id)
        .then((scenario) => {
          return cb(null, { scenario })
        })
        .catch((err) => {
          return cb({ code: 'GET_SCENARIO_ERROR' })
        })
    }],
    list_all_contacts: ['get_batch_obj', 'get_emailer_obj', (result, cb) => {
      let batch = result.get_emailer_obj.batch
      let recipients = batch.recipients

      Contacts.find({
        '_id': {
          $in: recipients
        }
      })
        .then((contacts) => {
          return cb(null, { contacts })
        })
        .catch((err) => {
          return cb({ code: 'LIST_CONTACT_ERROR' })
        })
    }],
    send_email: ['list_all_contacts', 'get_scenario_obj', (result, cb) => {
      let contacts = result.list_all_contacts.contacts

      async.mapSeries(contacts, (contact, callback) => {

      }, (err, all_scenarios) => {
        if (err) return cb(err)

        return cb(null, {})
      })
    }]
  })
}