const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
    required: true
  },

  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campaign',
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: true
  },

  archive: {
    type: Boolean,
    default: false
  },

});

module.exports = mongoose.model('scenario', schema);