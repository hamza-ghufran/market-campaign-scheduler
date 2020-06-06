const express = require("express");
const router = express.Router();

const Contacts = require('../../modules/contacts/api');
// Handle incoming requests to /scenario

router.post("/add", (req, res, next) => {

  Contacts.add(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });
      return next()
    }

    res.status(200).json({ contacts: result })
  })
});

module.exports = router;
