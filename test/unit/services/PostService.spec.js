describe.only('about Post Service operation.', function() {

  describe('create post', () => {
    before(async (done) => {
      done();
    });
    it('create Post should success.', async (done) => {
      try {
        const post = await PostService.create({
          title: '1213',
          content: '1213',
          category: '1213',
          tag: ['1213', '456', '789'],
          cover: '1213',
          url: '1213',
          abstract: '1213',
          location: '1213'
        });
        done();
      } catch (e) {
        done(e)
      }
    });
  });

  describe('find & update & destroy post by id', () => {
    let targetPost;
    before(async (done) => {
      try {
        targetPost = await Post.create({
          title: '1213',
          content: '1213',
          category: '1213',
          tag: ['1213', '456', '789'],
          cover: '1213',
          url: '1213',
          abstract: '1213',
          location: '1213'
        })
        done();
      } catch (e) {
        done(e);
      }
    });
    it('find Post should success.', async (done) => {
      try {
        const post = await PostService.findById({ id: targetPost.id });
        post.id.should.be.eq(targetPost.id);
        done()
      } catch (e) {
        done(e)
      }
    });

    it('update Post should success.', async (done) => {
      try {
        let data = {
          title: '456',
          content: '456',
          category: '456',
          tag: ['ABC', 'DEF', 'GHI'],
          cover: '456',
          url: '456',
          abstract: '456',
          location: '456'
        }
        const post = await PostService.update(targetPost.id, data);
        done()
      } catch (e) {
        done(e)
      }
    });

    it('destroy Post should success.', async (done) => {
      try {
        const post = await PostService.destroy({ id: targetPost.id });
        post.should.be.eq(1);
        done()
      } catch (e) {
        done(e)
      }
    });
  });

});
