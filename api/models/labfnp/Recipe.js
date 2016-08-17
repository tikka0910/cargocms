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
    },
    visibility: {
      type: Sequelize.ENUM('PUBLIC', 'PRIVATE', 'PROTECTED'),
      defaultValue: 'PUBLIC',
    },
    visibilityDesc: {
      type: Sequelize.VIRTUAL,
      get: function() {
        let desc = '';
        switch (this.visibility) {
          case 'PUBLIC':
            desc = '公開';
            break;
          case 'PRIVATE':
            desc = '非公開';
            break;
          case 'PROTECTED':
            desc = '半公開';
            break;
          default:
            desc = '公開';
        }
        return desc;
      }
    },
    productionStatus: {
      type: Sequelize.ENUM("NEW", "RECEIVED", "REQUESTED", "SUBMITTED", "PAID", "PROCESSING", "CANCELLED", "SHIPPED", "DELIVERED", "COMPLETED"),
      defaultValue: 'NEW',
    },
    productionStatusDesc: {
      type: Sequelize.VIRTUAL,
      get: function() {
        let desc = '';
        switch (this.productionStatus) {
          case 'NEW':
            desc = 'NEW';
            break;
          case 'SUBMITTED':
            desc = '下訂單';
            break;
          case 'PAID':
            desc = '已付款';
            break;
          case 'PROCESSING':
            desc = '製作中';
            break;
          case 'CANCELLED':
            desc = '取消';
            break;
          case 'SHIPPED':
            desc = '已寄出';
            break;
          case 'DELIVERED':
            desc = '已交付';
            break;
          case 'COMPLETED':
            desc = '完成';
            break;
          default:
            desc = 'NEW';
        }
        return desc;
      }
    },
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

      findAndIncludeUserLike: async ({user}) => {
        try {
          let id = -1;
          if(user) id = user.id;
          console.log("== id ==", id);
          const recipes = await Recipe.findAll({
            include: {
              where: {UserId: id},
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
