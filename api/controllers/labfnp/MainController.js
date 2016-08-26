module.exports = {


  explore: async function(req, res) {
    try {
      const { userId } = req.query;
      const currentUser = AuthService.getSessionUser(req);

      const recipes = await Recipe.findAndIncludeUserLike({
        findByUserId: userId,
        currentUser,
      });

      const url = sails.getBaseUrl() + '/recipe/';
      const models = recipes;
      const {socials} = sails.config

      let social = SocialService.getAllData({url, models, socials});

      sails.log.info("== social result ==", social);


      return res.view({
        recipes: recipes
      });



    }
    catch (e) {
      res.serverError(e);
    }
  },

  portfolio: async function(req, res) {

    let user = null;

    if (req.params.id) {
      user = await User.findById(req.params.id);
    }
    else {
      user = AuthService.getSessionUser(req);
    }

    try {
      return res.view({
        user,
        recipes: await Recipe.findAll({
          where: { userId: user.id },
          order: 'updatedAt desc',
        })
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },
}
