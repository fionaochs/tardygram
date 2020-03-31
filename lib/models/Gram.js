const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  caption: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},  {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

module.exports = mongoose.model('Gram', schema);
