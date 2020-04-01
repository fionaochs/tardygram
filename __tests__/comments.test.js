const { getGram, getComment, getUser, getAgent } = require('../db/data-helpers');

describe('comments routes', () => {
  it('creates a comment', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const gram = await getGram({ author: user._id });
    return getAgent()
      .post('/api/v1/comments')
      .send({
        comment: 'test comment',
        commentBy: user._id,
        gram: gram._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment:  expect.any(String),
          commentBy:  expect.any(String),
          gram: expect.any(String),
          __v: 0
        });
      });
  });

  it('deletes a comment', async() => {
    const comment = await getComment();
    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
