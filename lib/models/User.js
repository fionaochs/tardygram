const mongoose = require('mongoose');
const { hashSync, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePhotoUrl: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  const hash = hashSync(password, Number(process.env.SALT_ROUNDS) || 14);
  this.passwordHash = hash;
});

schema.statics.authorize = async function({ username, password }) {
  const user = await this.findOne({ username });
  if(!user){
    const error = new Error('Invalid username/password');
    error.status = 403;
    throw error;
  }

  const matchingPasswords = await compare(password, user.passwordHash);
  if(!matchingPasswords){
    const error = new Error('Invalid username/password');
    error.status = 403;
    throw error;
  }
  
  return user;
};

schema.methods.authToken = function() {
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET);
  return token; 
};

schema.statics.findByToken = function(token) {
  try {
    const { payload } = verify(token, process.env.APP_SECRET);
    return Promise.resolve(this.hydrate(payload));
  } catch(e){
    return Promise.reject(e);
  }
};
schema.statics.mostComments = function(count = 10) {
  return this
    .model('Comment')
    .aggregate([
      {
        '$group': {
          '_id': '$user', 
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
          'from': 'users', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user'
        }
      }
    ]);
};
module.exports = mongoose.model('User', schema);
