require('dotenv').config({ path: 'variables.env' });
require('./boot/cron-task')()

const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const contactRoutes = require('./routes/contacts');
const scenarioRoutes = require("./routes/scenario");
const campaignRoutes = require("./routes/campaign");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
  console.log(req.url)
  console.log(req.body)
  next();
});

//Open Routes
app.use("/contacts", contactRoutes);
app.use("/campaign", campaignRoutes);
app.use("/scenario", scenarioRoutes);

app.start = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/gerald', {
    useNewUrlParser: true,
    useCreateIndex: true
  })

  return app.listen(3002, () => {
    console.log('running')
  })
}

module.exports.start = function () {
  app.start()
}
