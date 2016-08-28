module.exports = {
  attributes: {
  },
  associations: () => {
    RecipeOrderItem.belongsTo(RecipeOrder);
    RecipeOrderItem.belongsTo(Recipe);
  },
  options: {
    classMethods: {
      addRecipe: async function({RecipeId, RecipeOrderId}) {
        const result = await RecipeOrderItem.create({
          RecipeId,
          RecipeOrderId,
        });
        return result;
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
