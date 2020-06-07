'use strict'

const async = require('async');
const Contacts = require("./schema");
const Batch = require('../batch/schema');
const csv_parser = require('../../utils/csv-parser');
const { arrayToObject } = require('../../utils/helper');

const add = function (data, _cb) {
  async.auto({
    create_contacts: (cb) => {
      let contacts = data.contacts

      Contacts.insertMany(contacts)
        .then((result) => {
          return cb(null, { contacts: result })
        })
        .catch(err => {
          console.log(err)
          return cb(err)
        });
    },
    list_contact_ids: ['create_contacts', (result, cb) => {
      let contacts = result.create_contacts.contacts

      let contacts_by_id = arrayToObject(contacts, '_id')
      contacts_by_id = Object.keys(contacts_by_id)

      return cb(null, { contacts_by_id: contacts_by_id })
    }],
    update_batch: ['list_contact_ids', (result, cb) => {
      let batch_id = data.batch_id
      let contacts_by_id = result.list_contact_ids.contacts_by_id

      Batch.updateOne({ _id: batch_id }, { recipient: contacts_by_id })
        .then((result) => {
          return cb(null, { batch: result })
        })
        .catch(err => {
          return cb(err)
        });
    }]
  }, function (error, results) {
    if (error) {
      return _cb({ code: 'INSERT_ERROR', message: error })
    }

    return _cb(null, { code: 'CONTACTS_ADDED' })
  })
}

module.exports.upload = function (data, _cb) {
  let file_path = data.file.path
  let batch_id = data.body.batch_id

  new csv_parser({
    batch_id,
    file_path,
  })
    .read((contacts) => {
      let dataObj = {
        contacts: contacts,
        batch_id
      }

      add(dataObj, _cb)
    })
}

module.exports.add = add

