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
      getFindAndIncludeUserLikeParam: ({findByRecipeId, findByUserId, currentUser }) => {
        try {
          let whereParam = { where: {} };
          if (findByUserId) {
            whereParam.where.UserId = findByUserId;
          } else if (findByRecipeId) {
            whereParam.where.id = findByRecipeId;
          }
          const currentUserId = currentUser ? currentUser.id : -1;
          return {
            ...whereParam,
            include: {
              where: {UserId: currentUserId},
              model: UserLikeRecipe,
              required: false
            }
          };
        } catch (e) {
          throw e;
        }
      },
      findAndIncludeUserLike: async function({findByRecipeId, findByUserId, currentUser }){
        try {
          const findParam = this.getFindAndIncludeUserLikeParam({findByRecipeId, findByUserId, currentUser });
          const recipes = await Recipe.findAll(findParam);
          return recipes;
        } catch (e) {
          throw e;
        }
      },
      findOneAndIncludeUserLike: async function({findByRecipeId, findByUserId, currentUser }){
        try {
          const findParam = this.getFindAndIncludeUserLikeParam({findByRecipeId, findByUserId, currentUser });
          const recipes = await Recipe.findOne(findParam);
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
