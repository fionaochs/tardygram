const { getGram, getGrams, getUser, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('grams routes', () => {
  it('creates a gram', async() => {
    const user = await getUser({ username: 'test@test.com' });
    
    return getAgent()
      .post('/api/v1/grams')
      .send({
        caption: 'test caption',
        photoUrl: 'url',
        tags: ['tag'],
        author: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          caption:  expect.any(String),
          photoUrl:  expect.any(String),
          tags: [expect.any(String)],
          author: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a gram by id', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const gram = await getGram({ author: user._id });
    return getAgent()
      .get(`/api/v1/grams/${gram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...gram,
          author: user._id
        });
      });
  });

  it('gets all grams', async() => {
    const grams = await getGrams();
    return request(app)
      .get('/api/v1/grams')
      .then(res => {
        expect(res.body).toEqual(grams);
      });
  });
});
