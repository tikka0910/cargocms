module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },

  create: async (recipe = {
    formula,
    formulaLogs,
    authorName,
    perfumeName,
    message,
    description,
    visibility,
    productionStatus,
    UserId,
  }) => {
    try {
      const bubble = (a,b) => a.scent.match(/(\d+)/g)[0]-b.scent.match(/(\d+)/g)[0];
      recipe.formula = recipe.formula.sort(bubble);
      sails.log.info(recipe);
      return await Recipe.create(recipe);
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  update: async (recipe = {
    id,
    formula,
    formulaLogs,
    authorName,
    perfumeName,
    message,
    description,
    visibility,
    productionStatus,
  }) => {
    try {
      const bubble = (a,b) => a.scent.match(/(\d+)/g)[0]-b.scent.match(/(\d+)/g)[0];
      recipe.formula = recipe.formula.sort(bubble);
      sails.log.info('update recipe service=>', recipe);
      let updatedRecipe = await Recipe.findOne({
        where: {
          id: parseInt(recipe.id, 10)
        },
      });
      if (updatedRecipe) {
        updatedRecipe.formula = recipe.formula;
        updatedRecipe.formulaLogs = recipe.formulaLogs;
        updatedRecipe.authorName = recipe.authorName;
        updatedRecipe.perfumeName = recipe.perfumeName;
        updatedRecipe.message = recipe.message;
        updatedRecipe.visibility = recipe.visibility;
        updatedRecipe.productionStatus = recipe.productionStatus
        updatedRecipe.description = recipe.description;

        updatedRecipe = await updatedRecipe.save();
      }
      return updatedRecipe;
    } catch (e) {
      throw e;
    }
  },
}
