const async = require('async')
const Emailer = require('./schema')
const Batch = require('../batch/schema')
const Contacts = require('../contacts/schema')
const Scenario = require('../scenario/schema')
const sgMailer = require('../../utils/send-grid')

module.exports.send = function (data, _cb) {
  const emailer_id = data.emailer_id

  async.auto({
    get_emailer_obj: (cb) => {
      Emailer.find({
        _id: emailer_id,
        active: true
      })
        .then((emailer) => {
          return cb(null, { emailer: emailer[0] })
        })
        .catch((err) => {
          return cb({ code: 'GET_EMAILER_ERROR', message: err })
        })
    },
    get_batch_obj: ['get_emailer_obj', (result, cb) => {
      let emailer_obj = result.get_emailer_obj.emailer
      let batch_id = emailer_obj.batch_id

      Batch.find({
        _id: batch_id
      })
        .then((batch) => {
          return cb(null, { batch: batch[0] })
        })
        .catch((err) => {
          return cb({ code: 'GET_BACH_ERROR', message: err })
        })
    }],
    get_scenario_obj: ['get_batch_obj', 'get_emailer_obj', (result, cb) => {
      let emailer_obj = result.get_emailer_obj.emailer
      let scenario_id = emailer_obj.scenario_id

      Scenario.find({
        _id: scenario_id
      })
        .then((scenario) => {
          return cb(null, { scenario: scenario[0] })
        })
        .catch((err) => {
          return cb({ code: 'GET_SCENARIO_ERROR', message: err })
        })
    }],
    list_all_contacts: ['get_batch_obj', 'get_emailer_obj', (result, cb) => {
      let batch = result.get_batch_obj.batch
      let recipient = batch.recipient

      Contacts.find({
        '_id': {
          $in: recipient
        }
      })
        .then((contacts) => {
          if (contacts.length) {
            return cb(null, { contacts })
          }

          return _cb(null, { code: 'NO_CONTACTS_WERE_FOUND' })
        })
        .catch((err) => {
          return cb({ code: 'LIST_CONTACT_ERROR', message: err })
        })
    }],
    send_email: ['list_all_contacts', 'get_scenario_obj', (result, cb) => {
      let contacts = result.list_all_contacts.contacts
      let scenario = result.get_scenario_obj.scenario

      async.mapSeries(contacts, (contact, callback) => {

        sgMailer({
          to: contact.email,
          text: scenario.content,
          subject: scenario.subject,
          from: 'hamzazeb95@gmail.com',
          html: `
          <strong>${scenario.content}</strong>
          <br>
          <a href="http://localhost:3002/contacts/unsubscribe?name=${contact.name}">Stop receiving email</a>
          `
        }, callback)

      }, (err, all_scenarios) => {
        if (err) return cb(err)

        return cb(null, {})
      })
    }],
    mark_email_obj_as_sent: ['send_email', (result, cb) => {
      Emailer.updateOne({ _id: emailer_id },
        {
          '$set': {
            active: false,
            sent: true,
          }
        })
        .then((result) => {
          return cb(null, {})
        })
        .catch((err) => {
          return cb({ code: 'ERROR_UPDATING_EMAILER' })
        })
    }],
    update_scenario_on_contact_served: [
      'get_emailer_obj',
      'list_all_contacts',
      'mark_email_obj_as_sent', (result, cb) => {
        let emailer_obj = result.get_emailer_obj.emailer
        let scenario_id = emailer_obj.scenario_id
        let contacts = result.list_all_contacts.contacts

        Scenario.updateOne({ _id: scenario_id },
          { contact_served: contacts.length })
          .then((scenario) => {
            return cb(null, {})
          })
          .catch((err) => {
            return cb({ code: 'UPDATE_SCENARIO_ERROR', message: err })
          })
      }]
  }, function (error, results) {

    if (error) {
      return _cb({ code: 'ERROR_SENDING_EMAIL', message: error })
    }

    return _cb(null, { code: 'EMAIL_SENT' })
  })
}