import crypto from 'crypto';
module.exports = {

  creator: async function(req, res) {
    try {
      let currentUser = AuthService.getSessionUser(req);

      if (!currentUser) {
        return res.redirect('/login');
      }

      return res.view({
        user: currentUser,
        scents: await Scent.findAllWithRelationFormatForApp()
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  explore: async function(req, res) {
    try {
      const { userId } = req.query;
      const currentUser = AuthService.getSessionUser(req);
      const recipes = await Recipe.findAndIncludeUserLike({
        findByUserId: userId,
        currentUser,
      });
      return res.view({
        recipes: recipes
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  recipe: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const recipe = await Recipe.findOneAndIncludeUserLike({
        findByRecipeId: id,
        currentUser
      });
      if (!recipe) {
        return res.notFound();
      }
      return res.view({ recipe });
    } catch (e) {
      console.log(e);
      return res.serverError(e);
    }
  },

  portfolio: async function(req, res) {

    let user = null;

    if (req.params.id) {
      user = await User.findById(req.params.id);
    }
    else {
      user = AuthService.getSessionUser(req);
    }

    try {
      return res.view({
        user,
        recipes: await Recipe.findAll({
          where: { userId: user.id },
          order: 'updatedAt desc',
        })
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  buy: async function(req, res) {
    try {
      const { id } = req.params;
      const allPayData = await AllpayService.getAllpayConfig({
        relatedKeyValue: {
          RecipeId: id,
        },
        MerchantTradeNo: crypto.randomBytes(32).toString('hex').substr(0, 8),
        tradeDesc: 'test gen config',
        totalAmount: 999,
        paymentMethod: 'ATM',
        itemArray: ['Item01', 'Item02'],
      });
      return res.view({
        AioCheckOut: AllpayService.getPostUrl(),
        ...allPayData
      });
    } catch (e) {
      res.serverError(e);
    }
  }
}
