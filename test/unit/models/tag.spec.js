describe('about Tag model operation.', function() {
  let targetPost;
  let tag;
  before(async (done) => {
    try {
      targetPost = await Post.create({
        title: '1213',
        content: '1213',
        category: '1213',
        cover: '1213',
        url: '1213',
        abstract: '1213',
      })
      tag = await Tag.create({
        title: 'A'
      });
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Tag should success.', async (done) => {
    try {
      await targetPost.addTag(tag.id);
      done();
    } catch (e) {
      done(e);
    }
  });
});
