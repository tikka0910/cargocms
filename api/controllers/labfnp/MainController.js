module.exports = {


  explore: async function(req, res) {
    try {
      const { userId } = req.query;
      const currentUser = AuthService.getSessionUser(req);

      const recipes = await Recipe.findAndIncludeUserLike({
        findByUserId: userId,
        currentUser,
      });

      let social = SocialService.forRecipe({recipes});

      return res.view({recipes, social});



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
      if(!user)
        return res.redirect("/login");
    }
    const recipes = await Recipe.findAll({
      where: { userId: user.id },
      order: 'Recipe.updatedAt desc',
      include: Image,
    })

    let followers = 0
    let starred = 0
    let Following = 0

    try {
      return res.view({
        user, recipes, followers, starred, following
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },
}
