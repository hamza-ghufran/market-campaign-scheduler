const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  batch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batch',
    required: true
  },
  scenario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'scenario',
    required: true
  },
  scheduled_at: {
    type: Date,
    required: true
  },
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campaign',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model('emailer', schema);