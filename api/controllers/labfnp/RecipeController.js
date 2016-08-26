
module.exports = {
  create: async function(req, res) {
    try {
      let currentUser = AuthService.getSessionUser(req);

      if (!currentUser) {
        return res.redirect('/login');
      }

      let recipe = Recipe.build().toJSON();
      recipe.message = ""
      recipe.description = ""

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i+1,
          scentCategorie: '',
          scentName: '',
          drops: 0
        };
        recipe.formula.push(formula);
      }
      console.log("=== recipe ===", recipe);

      return res.view({
        user: currentUser,
        recipe,
        scents: await Scent.findAllWithRelationFormatForApp()

      });
    }
    catch (e) {
      console.log(e);
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
      return res.view({ recipe });
    } catch (e) {
      console.log(e);
      return res.serverError(e);
    }
  },
  edit: async function(req, res) {
    const { id } = req.params;
  }
}
