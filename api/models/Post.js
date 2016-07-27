module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
    },
    category: {
      type: Sequelize.STRING,
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
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
