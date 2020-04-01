const { getAgent } = require('../db/data-helpers');

describe('user routes', () => {
  it('gets most popular user', async() => {
    return getAgent()
      .get('/api/v1/users/popular')
      .then(res => {
        expect(res.body.length).toEqual(10);
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          username: expect.any(String),
          profilePhotoUrl: expect.any(String),
          __v: 0
        });
      });
  });
});
