const { Router } = require('express');
// const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

module.exports = Router()
  .get('/popular', (req, res, next) => {
    User  
      .find()
      .then(users => res.send(users))
      .catch(next);
  });

