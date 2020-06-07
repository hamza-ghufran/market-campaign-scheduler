const express = require("express");
const router = express.Router();

const Scenario = require('../../modules/scenario/api');
// Handle incoming requests to /scenario

router.post("/list", (req, res, next) => {

  Scenario.list(req.body, (err, result) => {
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

  Scenario.add(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });
      return next()
    }

    res.status(200).json({ scenario: result })
  })
});

module.exports = router;
