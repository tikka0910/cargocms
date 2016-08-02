module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
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
    User.belongsToMany(Role, {through: 'UserRole'});
  },
  options: {
    classMethods: {
      findOneWithPassport: async ({userId}) => {
        console.log("findOneWithPassport userId=>", userId);
        return await User.findOne({
          where: {
            id: userId
          },
          include: [ Role, {
              model: Passport,
              where: { provider: 'local' }
          }]
        });
      }
    },
    instanceMethods: {},
    hooks: {
      afterCreate: async (user, options) => {
        const userRole = await Role.findOne({where: {authority: 'user'}});
        console.log(userRole.toJSON());
        await user.addRole(userRole);
      }
    }
  }
};
