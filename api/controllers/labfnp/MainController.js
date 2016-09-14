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
    isMe = (loginUser.id == user.id);
    let notShowPrivateRecipe = {};
    if(!isMe) {
      notShowPrivateRecipe = { visibility: { $not: 'PRIVATE' } };
    }
    const recipes = await Recipe.findAll({
      where: {
        userId: user.id,
        ...notShowPrivateRecipe
      },
      order: 'Recipe.updatedAt desc',
      include: Image,
    })

    const followers = await Follow.count({ where: { following: user.id }});
    const favorited = await UserLikeRecipe.count({where: { UserId: user.id }});
    const following = await Follow.count({ where: { follower: user.id }});
    let isFollowing = false;
    if(loginUser) {
      isFollowing  = await Follow.findOne({
        where: {
          follower: loginUser.id,
          following: user.id,
        }
      });
    }

    const userRecipes = await Recipe.findAll({where: { UserId: user.id }});
    const userRecipeIdArray = userRecipes.map((recipe) => recipe.id);
    const score = await UserLikeRecipe.count({where: { RecipeId: userRecipeIdArray }});

    try {
      return res.view({
        user, recipes, followers, favorited, following, isMe, score,
        isFollowing: !!isFollowing,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },
}
