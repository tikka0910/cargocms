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
    },
    TagsArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const tags = this.Tags ? this.Tags.map((tag) => tag.title) : [];
          return tags;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
  },
  associations: () => {
    Post.belongsToMany(Tag,  {
      through: 'PostTag',
      foreignKey: {
        name: 'PostId',
        as: 'Tags'
      }
    })
  },
  options: {
    classMethods: {
      findByIdHasJoin: async (id) => {
        try {
          return await Post.findOne({
            where: { id },
            include: Tag
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
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
      },
      deleteById: async (id) => {
        try {
          return await Post.destroy({ where: { id } });
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
