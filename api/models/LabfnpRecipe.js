module.exports = {
  attributes: {
    formula: {
      // from `full_picture`
      type: Sequelize.TEXT,
      set: function (val) {
         this.setDataValue('formula', JSON.stringify(val));
      },
      get: function () {
        var formula = this.getDataValue('formula');
         return JSON.parse(formula);
      }
    },
    authorName: {
      type: Sequelize.STRING,
    },
    perfumeName: {
      type: Sequelize.STRING,
    }
  },
  associations: function() {
    LabfnpRecipe.belongsTo(User)
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
