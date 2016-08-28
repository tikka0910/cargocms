module.exports = {
  attributes: {
    remark: {
      type: Sequelize.STRING,
    },
    ItemNameArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisRecipeOrders = this.getDataValue('RecipeOrderItems');
          const recipes = thisRecipeOrders ? thisRecipeOrders.map((order) => order.Recipe.perfumeName) : [];
          return recipes;
        } catch (e) {
          sails.log.error(e);
        }
      }
    }
  },
  associations: () => {
    RecipeOrder.belongsTo(User);
    RecipeOrder.hasMany(RecipeOrderItem);
  },
  options: {
    classMethods: {
      findByIdHasJoin: async(id) => {
        try {
          return await RecipeOrder.findOne({
            where: { id },
            include: [{
              model: User
            }, {
              model: RecipeOrderItem,
              include: Recipe,
            }]
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
