module.exports = {
  attributes: {

  },
  associations: () => {
    Follow.belongsTo(User, {
      foreignKey: {
        name: 'follower'
      }
    });
    Follow.belongsTo(User, {
      foreignKey: {
        name: 'following'
      }
    });
    Follow.belongsTo(User, {
      foreignKey: {
        name: 'starred'
      }
    });


  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
