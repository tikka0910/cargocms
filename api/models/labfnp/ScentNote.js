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
    ScentNote.hasMany(Scent);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
