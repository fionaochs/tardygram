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
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'gram'
});

schema.statics.mostComments = function(count = 10) {
  return this
    .model('Comment')
    .aggregate([
      {
        '$group': {
          '_id': '$gram', 
          'mostComments': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'mostComments': -1
        }
      }, {
        '$limit': count
      }, {
        '$lookup': {
          'from': 'grams', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'gram'
        }
      }, {
        '$unwind': {
          'path': '$gram'
        }
      }
    ]);
};

module.exports = mongoose.model('Gram', schema);
