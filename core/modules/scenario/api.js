const Scenario = require("./schema");

module.exports.add = function (data, cb) {

  new Scenario({
    name: data.name,
    date: data.date,
    time: data.time,
    content: data.content,
    subject: data.subject,
    campaign_id: data.campaign_id,
  })
    .save()
    .then((result) => {
      return cb(null, { code: 'SCENARIO_ADDED' })
    })
    .catch(err => {
      console.log(err)
      return cb({ code: 'INSERT_ERROR', message: err })
    });
}

module.exports.list = function (data, cb) {

  Scenario.find()
    .then((docs) => {
      if (docs.length) {
        return cb(null, { code: 'LIST_SCENARIO_FETCHED', data: docs })
      }

      return cb(null, { code: 'NO_ENTRIES_FOUND' })
    })
    .catch((err) => {
      console.log(err);

      return cb({ cb: 'LIST_ERROR' })
    });
}