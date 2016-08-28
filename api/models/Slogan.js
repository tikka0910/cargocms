module.exports = {
  attributes: {
    content: Sequelize.STRING,
    source: Sequelize.STRING,
  },
  associations: () => {},
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Slogan.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {},
    hooks: {}
  }
};
