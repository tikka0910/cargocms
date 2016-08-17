module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },

  bubbleSort: (a) => {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
          var thisNum = parseInt(a[i].scent.match(/(\d+)/g)[0]);
          var nextNum = parseInt(a[i+1].scent.match(/(\d+)/g)[0]);
            if (thisNum > nextNum) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return a;
  },

  create: async (recipe = {
    formula,
    formulaLogs,
    authorName,
    perfumeName,
    message,
    description,
    UserId,
  }) => {
    try {
      recipe.formula = RecipeService.bubbleSort(recipe.formula);
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
  }) => {
    try {
      recipe.formula = RecipeService.bubbleSort(recipe.formula);
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

        updatedRecipe = await updatedRecipe.save();
      }
      return updatedRecipe;
    } catch (e) {
      throw e;
    }
  },
}
