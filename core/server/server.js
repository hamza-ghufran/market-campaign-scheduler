const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const contactRoutes = require('./routes/contacts');
const scenarioRoutes = require("./routes/scenario");
const campaignRoutes = require("./routes/campaign");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Open Routes
app.use("/contacts", contactRoutes);
app.use("/campaign", campaignRoutes);
app.use("/scenario", scenarioRoutes);

//404
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

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
