'use strict'

const cron = require('node-cron')
const scheduler = require('../../modules/scheduler/api').scheduler

module.exports = function () {

  // daily at 06: 00
  cron.schedule('0 6 * * *', () => {
    scheduler((err, results) => {

      if (err) {
        return console.log(err)
      }

      console.log(results)
    })
  })
}