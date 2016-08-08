module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    Feel.belongsTo(Scent);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
