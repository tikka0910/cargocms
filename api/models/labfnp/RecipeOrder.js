module.exports = {
  attributes: {
    remark: {
      type: Sequelize.STRING,
    },
  },
  associations: () => {
    RecipeOrder.belongsTo(User);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
