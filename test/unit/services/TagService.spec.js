describe.only('about Tag Service operation.', function() {

  describe('add Tag to Post', () => {
    let tagsIds;
    let targetPost;
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
        done();
      } catch (e) {
        done(e);
      }
    });
    it('add to Post should success.', async (done) => {
      try {
        const datas = [{
          title: 'A',
        }, {
          title: 'B',
        }];
        const result = await TagService.updateOrCreate({
          postId: targetPost.id,
          datas,
        });
        result[0].title.should.be.eq(datas[0].title);
        result[1].title.should.be.eq(datas[1].title);
        done()
      } catch (e) {
        done(e)
      }
    });
  });

  describe('update Tag to Post', () => {
    let targetPost;
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
        const datas = [{
          title: 'A',
        }, {
          title: 'B',
        }];
        await TagService.updateOrCreate({
          postId: targetPost.id,
          datas,
        });
        done();
      } catch (e) {
        done(e);
      }
    });
    it('update Post tags should success.', async (done) => {
      try {
        const datas = [{
          title: 'A',
        }, {
          title: 'C',
        }];
        const result = await TagService.updateOrCreate({
          postId: targetPost.id,
          datas,
        });
        result[0].title.should.be.eq(datas[0].title);
        result[1].title.should.be.eq(datas[1].title);
        done()
      } catch (e) {
        done(e)
      }
    });
  });


});
