describe('about Tag Service operation.', function() {

  describe('create tag', () => {
    before(async (done) => {
      done();
    });
    it('create Tag should success.', async (done) => {
      try {
        const datas = [{
          title: 'A',
        }, {
          title: 'B',
        }];
        let result = await TagService.create(datas);
        console.log(result);
        done();
      } catch (e) {
        done(e)
      }
    });
  });

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
        const datas = [{
          title: 'C',
        }, {
          title: 'D',
        }];
        tagsIds = await TagService.create(datas);
        done();
      } catch (e) {
        done(e);
      }
    });
    it('add to Post should success.', async (done) => {
      try {
        const result = await TagService.addToPost({
          postId: targetPost.id,
          tags: tagsIds,
        });
        done()
      } catch (e) {
        done(e)
      }
    });
  });

  describe.only('update Tag to Post', () => {
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
        const originTags = await TagService.create([{
            title: 'C',
          }, {
            title: 'D',
          }]
        );
        await targetPost.addTags(originTags);
        tagsIds = await TagService.create([{
            title: 'C',
          }, {
            title: 'E',
          }]
        );
        done();
      } catch (e) {
        done(e);
      }
    });
    it('update Post tags should success.', async (done) => {
      try {
        const result = await TagService.updatePostTag({
          postId: targetPost.id,
          tags: tagsIds,
        });
        console.log(result);
        done()
      } catch (e) {
        done(e)
      }
    });
  });


});
