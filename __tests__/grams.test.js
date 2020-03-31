// const { getGram, getGrams, getUser } = require('../db/data-helpers');

// const request = require('supertest');
// const app = require('../lib/app');

// describe('app routes', () => {
//   it('creates a gram', () => {
//     const user = getUser();
//     return request(app)
//       .post('/api/v1/grams')
//       .send({
//         caption: 'test caption',
//         photoUrl: 'url',
//         tags: ['test tag'],
//         author: user._id
//       })
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           caption:  expect.any(String),
//           photoUrl:  expect.any(String),
//           tags: [expect.any(String)],
//           author: expect.any(String),
//           __v: 0
//         });
//       });
//   });

//   it('gets a gram by id', async() => {
//     const gram = await getGram();
//     const users = await getUsers({ author: gram._id });

//     return request(app)
//       .get(`/api/v1/grams/${gram._id}`)
//       .then(res => {
//         expect(res.body).toEqual({
//           ...gram,
//           films: expect.arrayContaining(films)
//         });
//       });
//   });

//   it('gets all actors', async() => {
//     const actors = await getActors();
//     return request(app)
//       .get('/api/v1/actors')
//       .then(res => {
//         expect(res.body).toEqual(actors);
//       });
//   });
// });
