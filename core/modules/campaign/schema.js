const mongoose = require('mongoose');

const schema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true
    },

    batch_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batch',
        required: true
    },

    recipients: {
        type: Array
    },

    start_date: {
        type: Date,
        required: true
    },

    end_date: {
        type: Date,
        required: true
    },

    description: {
        type: String
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

module.exports = mongoose.model('campaign', schema);