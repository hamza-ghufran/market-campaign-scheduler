const express = require("express");
const router = express.Router();

const Campaign = require('../../modules/campaign/api');
// Handle incoming requests to /campaign

router.post("/list", (req, res, next) => {

  Campaign.list(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });

      return next()
    }

    res.status(200).json({ ...result })
  });
})

router.post("/add", (req, res, next) => {

  Campaign.add(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });
      return next()
    }

    res.status(200).json({ campaign: result })
  })
});

module.exports = router;
