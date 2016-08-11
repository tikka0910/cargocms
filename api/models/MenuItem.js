module.exports = {
  attributes: {
    icon: {
      type: Sequelize.STRING,
    },
    href: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
  },
  associations: function() {
    MenuItem.hasMany(MenuItem, {
      as: 'SubMenuItems',
      foreignKey: {
        name: 'ParentMenuItemId'
      }
    });
  },
  options: {
    classMethods: {
      findAllWithSubMenu: async function () {
        let menuItems = await MenuItem.findAll({
          where: {
            ParentMenuItemId: null
          },
          include: {model: MenuItem, as: 'SubMenuItems'}
        });

        return menuItems;
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
