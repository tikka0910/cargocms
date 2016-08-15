describe('about LikeRecipe Controller operation.', function() {

  it('Recipe like action should be success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/recipe/like/:id`)
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Recipe unlike should be success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/recipe/unlike/:id`)
      done();
    } catch (e) {
      done(e);
    }
  });



});
