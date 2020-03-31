const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Gram = require('../lib/models/Gram');

module.exports = async({ usersToCreate = 5, notesToCreate = 100 } = {}) => {
  const loggedInUser = await User.create({
    username: 'test@test.com',
    password: 'password',
    profilePhotoUrl: chance.url()
  });

  // const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
  //   username: `${chance.profession()} ${chance.animal()}`,
  //   password: chance.animal(),
  //   profilePhotoUrl: chance.url()
  // })));

  // await Gram.create([...Array(notesToCreate)].map(() => ({
  //   title: chance.profession(),
  //   body: chance.sentence(),
  //   author: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  // })));
};
