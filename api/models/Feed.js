module.exports = {
  attributes: {
    picture: {
      // from `full_picture`
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    story: {
      type: Sequelize.STRING,
    },
    createdTime: {
      // from `created_time`
      type: Sequelize.DATE,
    },
    sourceId: {
      // from `id`
      type: Sequelize.STRING,
    }
  },
  associations: function() {

  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};