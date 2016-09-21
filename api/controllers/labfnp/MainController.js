module.exports = {

  explore: async function(req, res) {
    try {
      const { userId } = req.query;
      const currentUser = AuthService.getSessionUser(req);

      const recipes = await Recipe.findAndIncludeUserLike({
        findByUserId: userId,
        currentUser,
        start: 0,
        length: 100,
      });

      let social = SocialService.forRecipe({recipes});

      return res.view({recipes, social});
    }
    catch (e) {
      res.serverError(e);
    }
  },

  editPofile: async function(req, res) {
    let user = null;
    let isMe = false;
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) return res.redirect('/login');

      const user = await User.findOneWithPassport({ id: loginUser.id });

      return res.view({
        user: user,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  portfolio: async function(req, res) {
    let user = null;
    let isMe = false;
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);

      if (id) {
        user = await User.findOne({where:{ id }});
        if(!user) return res.notFound("查無使用者");
      } else {
        user = loginUser
        if(!user) return res.redirect("/login");
      }
      isMe = (loginUser && (loginUser.id == user.id));

      let notShowPrivateRecipe = {};
      if(!isMe) notShowPrivateRecipe = { visibility: { $not: 'PRIVATE' } };

      const recipes = await Recipe.findAll({
        where: {
          UserId: user.id,
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
