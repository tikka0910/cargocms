describe('about Post model operation.', function() {
  it('create Post should success.', async (done) => {
    try {
      const post = await Post.create({
        title: '1213',
        content: '1213',
        category: '1213',
        tag: ['1213', '456', '789'],
        cover: '1213',
        url: '1213',
        abstract: '1213',
        location: '1213'
      })
      post.id.should.be.INTEGER;
      done();
    } catch (e) {
      done(e);
    }
  });
});
