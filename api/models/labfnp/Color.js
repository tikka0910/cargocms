module.exports = {
  attributes: {
    code: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }


  },
  associations: function() {
    Color.hasMany(Formula);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
