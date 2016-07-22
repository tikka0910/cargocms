module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    User.hasMany(Post);
    User.hasMany(Passport);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
