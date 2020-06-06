const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports = function (data, cb) {
  let msg = data

  sgMail
    .send({ ...msg },
      function (err) {
        if (err) return cb({ code: 'EMAIL_NOT_SENT', message: err })

        return cb(null)
      })
}

