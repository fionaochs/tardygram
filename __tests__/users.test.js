const { getUser, getAgent } = require('../db/data-helpers');

describe('user routes', () => {
  it('gets most popular user', async() => {
    const user = await getUser({ username: 'test@test.com' });
    return getAgent()
      .get('/api/v1/users/popular')
      .then(res => {
        expect(res.body).toContainEqual(user);
      });
  });
});
