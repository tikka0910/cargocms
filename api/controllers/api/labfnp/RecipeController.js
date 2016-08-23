module.exports = {

  find: async (req, res) => {

    try {
      let user = AuthService.getSessionUser(req);
      const recipes = await Recipe.findAndIncludeUserLike({currentUser: user});
      res.ok({
        data: {
          items: recipes
      }});
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    console.log("=== findOne ===");
    const { id } = req.params;
    try {
      const recipe = await Recipe.findOneWithScent({id})
      sails.log.info('get recipe =>', recipe);
      res.ok({
        message: 'Get recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      const loginedUser = AuthService.getSessionUser(req);
      if (loginedUser) {
        data.UserId = loginedUser.id;
      }
      sails.log.info('create recipe controller=>', data);
      const recipe = await RecipeService.create(data);
      res.ok({
        message: 'Create recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      sails.log.info('update recipe controller id=>', id);
      sails.log.info('update recipe controller data=>', data);
      const recipe = await RecipeService.update({
        id: id,
        ...data,
      });
      res.ok({
        message: 'Update recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      sails.log.info('delete recipe controller=>', id);
      const recipe = await Recipe.deleteById(id);
      res.ok({
        message: 'Delete recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  like: async(req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) throw Error('permission denied');
      const recipe = await Recipe.findById(id);
      await UserLikeRecipe.createIfNotExist({RecipeId: id, UserId: loginUser.id})

      res.ok({
        message: 'success like recipe',
        data: true,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },
  unlike: async (req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) throw Error('permission denied');

      const recipe = await Recipe.findById(id);
      await UserLikeRecipe.destroy({
        where: {RecipeId: id, UserId: loginUser.id}
      })
      res.ok({
        message: 'success dislike recipe',
        data: true,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }

}
