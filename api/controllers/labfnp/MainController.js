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
    let isMe = false;
    let loginUser = AuthService.getSessionUser(req);
    if (req.params.id) {
      user = await User.findById(req.params.id);
    }
    else {
      user = loginUser
      if(!user)
        return res.redirect("/login");
    }
    isMe = (loginUser == user);

    const recipes = await Recipe.findAll({
      where: { userId: user.id },
      order: 'Recipe.updatedAt desc',
      include: Image,
    })

    let followers = 0
    let starred = 0
    let following = 0

    try {
      return res.view({
        user, recipes, followers, starred, following, isMe
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },
}
