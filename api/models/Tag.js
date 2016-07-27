module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    },
  },
  associations: () => {
    Tag.belongsToMany(Post,  {through: 'PostTag'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
