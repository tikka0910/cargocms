module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
    },
    // 特色圖片
    cover: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    abstract: {
      type: Sequelize.STRING,
    }
  },
  associations: () => {
    Post.belongsToMany(Tag,  {through: 'PostTag'})
  },
  options: {
    classMethods: {
      findByTagId: async (id) => {
        try {
          return await Post.findAll({
            include: {
              model: Tag,
              where: { id },
            }
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
