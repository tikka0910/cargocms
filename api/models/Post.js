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
    tag: {
      type: Sequelize.TEXT,
      get() {
        let returnValue;
        const value = this.getDataValue('tag');
        if (value) {
          returnValue = JSON.parse(value);
        } else {
          returnValue = [];
        }
        return returnValue;
      },
      set(value) {
        console.log('value', value);
        return this.setDataValue('tag', JSON.stringify(value));
      },
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
    location: {
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
