module.exports = {
  attributes: {
  },
  associations: function() {


    UserLikeRecipe.belongsTo(User);
    UserLikeRecipe.belongsTo(Recipe);

  },
  options: {
    classMethods: {

    },
    instanceMethods: {

    },
    hooks: {

    }
  }
};
