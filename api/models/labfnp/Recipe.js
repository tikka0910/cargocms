module.exports = {
  attributes: {
    //TODO authorAvatar
    formula: {
      // from `full_picture`
      type: Sequelize.TEXT,
      set: function (val) {
        if (val) {
          this.setDataValue('formula', JSON.stringify(val));
        }
        else {
          this.setDataValue('formula', "[]");
        }
      },
      get: function () {
        try {
          var formula = this.getDataValue('formula');
          if (formula) {
            return JSON.parse(formula);
          }
          else {
            return [];
          }
        }
        catch (e) {
          console.log(e);
          return [];
        }
      }
    },
    formulaLogs: {
      type: Sequelize.TEXT
    },
    authorName: {
      type: Sequelize.STRING,
    },
    perfumeName: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
    },
    totalDrops: {
      type: Sequelize.INTEGER,
    },
    coverPhoto: {
      type: Sequelize.STRING,
    }
  },
  associations: function() {
    Recipe.hasMany(UserLikeRecipe);
    Recipe.belongsTo(User);
  },
  options: {
    classMethods: {
      findOneWithScent: async function({id}) {
        sails.log.info("findOneWithUser id=>", id);
        let recipeWithScent = '';
        const recipes = await Recipe.findOne({
          where: {
            id
          },
          include: User,
        });
        return recipes;
      },

      deleteById: async (id) => {
        try {
          return await Recipe.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },

      findAndIncludeUserLike: async ({ currentUser, userId }) => {
        try {
          let id = userId || -1;
          let currentUserId = -1;
          if(currentUser) currentUserId = currentUser.id;
          console.log("== id ==", id);
          const recipes = await Recipe.findAll({
            where: {
              UserId: userId
            },
            include: {
              where: {UserId: currentUserId},
              model: UserLikeRecipe,
              required: false
            }
          });

          // const recipes = await User.findAll({
          //   include: [{
          //     where: { RecipeId: 1 },
          //     model: Recipe,
          //     as: 'LikeRecipe',
          //     required: false
          //   }]
          // });
          return recipes;
        } catch (e) {
          throw e;
        }
      },


    },
    instanceMethods: {},
    hooks: {}
  }
};
