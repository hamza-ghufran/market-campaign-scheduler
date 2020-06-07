const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  recipient: {
    type: Array
  }

});

module.exports = mongoose.model('batch', schema);