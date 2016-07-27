module.exports = {
  attributes: {
    authority: Sequelize.STRING
  },
  classMethods: {
    associate: (models) => {
      User.belongsToMany(Role, {through: 'UserRole'});
    }
  }
};
