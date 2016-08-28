
module.exports = {
  create: async function(req, res) {
    try {
      let user = AuthService.getSessionUser(req);

      if (!user) {
        return res.redirect('/login');
      }

      let recipe = Recipe.build().toJSON();
      recipe.message = ""
      recipe.description = ""

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i + 1,
          scentCategory: '',
          scentName: '',
          drops: 0
        };
        recipe.formula.push(formula);
      }

      let scents = await Scent.findAllWithRelationFormatForApp()

      let totalDrops = 0;

      return res.view({user, recipe, scents, totalDrops});
    }
    catch (e) {
      res.serverError(e);
    }
  },

  show: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const recipe = await Recipe.findOneAndIncludeUserLike({
        findByRecipeId: id,
        currentUser
      });
      if (!recipe) {
        return res.notFound();
      }

      let editable = false;
      if(currentUser && recipe.UserId == currentUser.id)
        editable = true;

      let social = SocialService.forRecipe({recipes: [recipe]});

      return res.view({ recipe, editable, social});
    } catch (e) {

      return res.serverError(e);
    }
  },

  preview: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const recipe = await Recipe.findOneAndIncludeUserLike({
        findByRecipeId: id,
        currentUser
      });
      if (!recipe) {
        return res.notFound();
      }

      let editable = false;
      if (currentUser && recipe.UserId == currentUser.id)
        editable = true;

      const social = SocialService.forRecipe({recipes: [recipe]});

      return res.view({ recipe, editable, social});
    } catch (e) {

      return res.serverError(e);
    }
  },

  order: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const recipe = await Recipe.findOneAndIncludeUserLike({
        findByRecipeId: id,
        currentUser
      });
      if (!recipe) {
        return res.notFound();
      }

      let editable = false;
      if (currentUser && recipe.UserId == currentUser.id)
        editable = true;

      const social = SocialService.forRecipe({recipes: [recipe]});

      return res.view({ recipe, editable, social});
    } catch (e) {

      return res.serverError(e);
    }
  },

  edit: async function(req, res) {
    try {
      let user = AuthService.getSessionUser(req);
      if (!user) {
        return res.redirect('/login');
      }

      const { id } = req.params;
      const scents = await Scent.findAllWithRelationFormatForApp()
      let recipe = await Recipe.findOne({
        where:{id},
        include: User
      });

      recipe = recipe.toJSON();

      if(recipe.User.id != user.id){
        const message = "只可維護自己的配方";
        // return res.forbidden({message});
        return res.forbidden(message);
      }
      user = recipe.User;
      let recipeFormula = recipe.formula;
      let formatFormula = [];
      let totalDrops = 0;

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i + 1,
          scentCategory: '',
          scentName: '',
          drops: 0
        };
        if(recipeFormula[i] != null){
          formula.drops = recipeFormula[i].drops;
          formula.scentName = recipeFormula[i].scent;
          formula.scentCategory = recipeFormula[i].scent.charAt(0);
        }

        totalDrops += parseInt(formula.drops, 10);

        formatFormula.push(formula);

      }
      recipe.formula = formatFormula;

      return res.view({user, recipe, scents, totalDrops});

    } catch (e) {
      return res.serverError(e);
    }
  }
}
