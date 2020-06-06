'use strict'

const cron = require('node-cron')
const scheduler = require('../../modules/scheduler/api').scheduler

module.exports = function () {

  //daily at 08:00
  // cron.schedule('* 8 * * *', () => {
  scheduler((err, results) => {

    if (err) {
      return console.log(err)
    }

    console.log(results)
  })
  // })
}