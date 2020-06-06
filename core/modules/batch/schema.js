const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  // campaign_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'campaign',
  //   required: true
  // },

  recipient: {
    type: Array
  }

});

module.exports = mongoose.model('batch', schema);