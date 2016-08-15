describe('about LikeRecipe Controller operation.', function() {

  it('create LikeRecipe should success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/api/admin/likeRecipe/:id`)
      done();
    } catch (e) {
      done(e);
    }
  });

  it('delete LikeRecipe should success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .del(`/api/admin/likeRecipe/:id`)
      done();
    } catch (e) {
      done(e);
    }
  });



});
