'use strict'

const async = require('async')
const Campaign = require("./schema");
const Batch = require('../../modules/batch/schema')

module.exports.add = function (data, _cb) {

  async.auto({
    create_batch: (cb) => {
      new Batch()
        .save()
        .then((batch) => {
          return cb(null, { batch: batch })
        })
        .catch((err) => {
          console.log(err)
          return cb(err)
        })
    },
    create_campaign: ['create_batch', (result, cb) => {
      let batch = result.create_batch.batch

      new Campaign({
        name: data.name,
        batch_id: batch._id,
        end_date: data.end_date,
        start_date: data.start_date,
        description: data.description,
      })
        .save()
        .then((result) => {
          return cb(null, { result })
        })
        .catch(err => {
          console.log(err)
          return cb(err)
        });
    }]
  }, function (error, results) {

    if (error) {
      return _cb({ code: 'INSERT_ERROR', message: error })
    }

    return _cb(null, { code: 'CAMPAIGN_ADDED' })
  })
}

module.exports.list = function (data, cb) {

  Campaign.find()
    .then((docs) => {
      if (docs.length) {
        return cb(null, { code: 'LIST_CAMPAIGN_FETCHED', data: docs })
      }

      return cb(null, { code: 'NO_ENTRIES_FOUND' })
    })
    .catch((err) => {
      console.log(err);

      return cb({ cb: 'LIST_ERROR' })
    });
}