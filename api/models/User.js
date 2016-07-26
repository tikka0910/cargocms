module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    locale: {
      type: Sequelize.STRING,
      defaultValues: 'zh_TW'
    },
    displayName: {
      type: Sequelize.VIRTUAL,
      get: function() {

        let locale = this.getDataValue('locale');
        let firstName = this.getDataValue('firstName');
        let lastName = this.getDataValue('lastName');

        let displayName = firstName + lastName
        if(locale == 'zh_TW')
          displayName = lastName + firstName

        return displayName;

      }
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
