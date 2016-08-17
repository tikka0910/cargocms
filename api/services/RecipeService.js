module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },

  bubbleSort: (array) => {
    var updatedArray = array;
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < updatedArray.length-1; i++) {
          var thisNum = parseInt(updatedArray[i].scent.match(/(\d+)/g)[0]);
          var nextNum = parseInt(updatedArray[i+1].scent.match(/(\d+)/g)[0]);
            if (thisNum > nextNum) {
                var temp = updatedArray[i];
                updatedArray[i] = updatedArray[i+1];
                updatedArray[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return updatedArray;
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
    visibility,
    productionStatus,
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
