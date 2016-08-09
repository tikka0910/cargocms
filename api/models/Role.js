module.exports = {
  attributes: {
    authority: Sequelize.STRING
  },

  associate: (models) => {
    User.belongsToMany(Role, {
      // as: 'Users',
      // to: 'Roles',
      through: 'UserRole',
      foreignKey: {
        name: 'RoleId',
        as: 'Users'
      }
    });
  },
  options: {
    // tableName: 'Roles'
  }

};
