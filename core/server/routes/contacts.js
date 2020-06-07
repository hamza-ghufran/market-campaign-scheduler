const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const Contacts = require('../../modules/contacts/api');

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

router.post("/upload", upload.single('file'), (req, res, next) => {

  Contacts.upload(req, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });
      return next()
    }

    res.status(200).json({ result })
  })
});

module.exports = router;
