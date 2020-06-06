const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  batch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batch',
    required: true
  }

});

module.exports = mongoose.model('contacts', schema);