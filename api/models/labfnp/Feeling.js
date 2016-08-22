module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    scentName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    totalRepeat: {
      type: Sequelize.STRING,
      defaultValues: 0
    },

    score: {
      type: Sequelize.STRING,
      defaultValues: 0
    },

    updatedAt: {
      type: Sequelize.DATE,
      get: ModelService.updatedAtSetter
    },

    createdAt: {
      type: Sequelize.DATE,
      get: ModelService.createdAtSetter
    }

  },
  associations: function() {
    //Feeling.belongsTo(Scent);
  },
  options: {
    // timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
