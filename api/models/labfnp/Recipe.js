import moment from 'moment';
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
          sails.log.error(e);
          return [];
        }
      }
    },

    formulaTotalDrops: {
      type: Sequelize.VIRTUAL,
      get: function () {
        try {
          var formula = this.getDataValue('formula');
          let formulaTotalDrops = 0;
          if (formula) {
            JSON.parse(formula).forEach((element, index, array) => {
              formulaTotalDrops += Number(element.drops);
            })
          }
          return formulaTotalDrops;
        }
        catch (e) {
          sails.log.error(e);
          return 0;
        }
      }
    },

    formulaLogs: {
      type: Sequelize.TEXT
    },

    authorName: {
      type: Sequelize.STRING,
      defaultValue: ''
    },

    authorFbPage: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisUser = this.getDataValue('User');
          let fbId = 'https://www.facebook.com/LabFnP';
          if (thisUser) {
            if (thisUser.Passports) {
              thisUser.Passports.forEach((passport) => {
                const existProvider = typeof passport.dataValues.provider === 'string';
                const checkProviderType = passport.dataValues.provider === 'facebook';
                if (existProvider && checkProviderType) {
                  fbId = passport.dataValues.identifier;
                }
              });
            }
          }
          return fbId;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

    perfumeName: {
      type: Sequelize.STRING,
      defaultValue: ''
    },

    message: {
      type: Sequelize.STRING,
      get: function() {
        const val = this.getDataValue('message');
        if (typeof val !== 'string' || val === null) return '沒有備註';
        return val;
      }
    },

    description: {
      type: Sequelize.STRING,
      get: function() {
        const val = this.getDataValue('description');
        if (typeof val !== 'string' || val === null) return '沒有描述';
        return val;
      }
    },

    createdBy: {
      type: Sequelize.ENUM('scent', 'feeling'),
      defaultValue: "scent"
    },

    totalDrops: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    coverPhoto: {
      type: Sequelize.STRING,
      defaultValue: '',
      get: function() {
        try {
          const thisImage = this.getDataValue('Image');
          const thisId = this.getDataValue('id');
          return thisImage ? thisImage.url : `/assets/labfnp/img/recipe-default-cover.${thisId % 8}.jpg`;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

    visibility: {
      type: Sequelize.ENUM('PUBLIC', 'PRIVATE', 'PROTECTED'),
      defaultValue: 'PRIVATE',
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

    updatedAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('updatedAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

    createdAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('createdAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

    createdAtIso: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          return moment(this.getDataValue('createdAt'), moment.ISO_8601);
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

    updatedAtIso: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          return moment(this.getDataValue('updatedAt'), moment.ISO_8601);
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

  },
  associations: function() {
    Recipe.hasMany(UserLikeRecipe);
    Recipe.belongsTo(User);
    Recipe.belongsTo(Image, {
      foreignKey: {
        name: 'coverPhotoId'
      }
    });
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
          include: [User, Image],
        });
        console.log('findOneWithScent recipe=>', recipes);
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
      getFindAndIncludeUserLikeParam: ({findByRecipeId, findByUserId, currentUser, start, length }) => {
        try {
          let whereParam = { where: {} };
          if (findByUserId) {
            whereParam.where.UserId = findByUserId;
          } else if (findByRecipeId) {
            whereParam.where.id = findByRecipeId;
          }
          let notAdmin = true;
          let ownUserId = {};
          if (currentUser) {
            notAdmin = currentUser.RolesArray.indexOf('admin') === -1;
            ownUserId.UserId = currentUser.id;
          }
          if (notAdmin) {
            whereParam.where.$or = [
              { visibility: { $not: 'PRIVATE' } },
              ownUserId
            ];
          }
          let paging = {};
          if (start != null && length != null) {
            paging = {
              offset: start,
              limit: length,
            };
          }
          const currentUserId = currentUser ? currentUser.id : -1;
          return {
            ...whereParam,
            ...paging,
            include: [{
              model: UserLikeRecipe,
              required: false
            }, {
              model: Image,
            }, {
              model: User,
              include: {
                model: Passport,
                attributes: ['provider', 'identifier']
              },
            }]
          };
        } catch (e) {
          throw e;
        }
      },
      findAndIncludeUserLike: async function({findByRecipeId, findByUserId, currentUser, start, length }){
        try {
          const findParam = this.getFindAndIncludeUserLikeParam({
            findByRecipeId,
            findByUserId,
            currentUser,
            start,
            length
          });
          let recipes = await Recipe.findAll(findParam);
          recipes.map((recipe) => recipe.checkCurrentUserLike({currentUser}));
          return recipes;
        } catch (e) {
          throw e;
        }
      },
      findOneAndIncludeUserLike: async function({findByRecipeId, findByUserId, currentUser }){
        try {
          const findParam = this.getFindAndIncludeUserLikeParam({findByRecipeId, findByUserId, currentUser });
          const recipe = await Recipe.findOne(findParam);

          if(!recipe){
            const isPrivateRecipe = await Recipe.findById(findParam.where.id);
            if(isPrivateRecipe){
              const error = new Error('no Permission');
              error.type = 'noPermission';
              throw error;
            } else{
              return recipe;
            }
          }

          await recipe.checkCurrentUserLike({currentUser})
          return recipe;
        } catch (e) {
          throw e;
        }
      },
      getFeelings: async function({id}){
        try {
          const recipe = await Recipe.findOne({where: {id}});
          const {formula} = recipe;

          const secntNames = formula.map(oneFormula => oneFormula.scent)
          const where = {name: secntNames}

          const scents = await Scent.findAll({where});
          let feelings = scents.reduce((result, scent) => result.concat(scent.feelings), []);
          feelings = RecipeService.sortFeelingsByValue({feelings});


          return feelings;
        } catch (e) {
          throw e;
        }
      },
    },
    instanceMethods: {
      checkCurrentUserLike: async function({ currentUser }) {
        try {
          const userLikeRecipes = this.getDataValue('UserLikeRecipes') || [];
          this.currentUserLike = false;
          if (currentUser) {
            for(let i = 0; i < userLikeRecipes.length; i++) {
              const currentUserLikeThisRecipe = userLikeRecipes[i].UserId === currentUser.id;
              if (currentUserLikeThisRecipe) {
                this.currentUserLike = true;
                break;
              }
            }
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    hooks: {}
  }
};
