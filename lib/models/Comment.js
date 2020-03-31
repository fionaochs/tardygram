const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gram',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', schema);
