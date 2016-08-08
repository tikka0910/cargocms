module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    Scent.belongsTo(ScentNote);
    Scent.hasMany(Feel);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
