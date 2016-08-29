import crypto from 'crypto';
module.exports = {
  create: async function(req, res) {
    try {
      let user = AuthService.getSessionUser(req);

      if (!user) {
        return res.redirect('/login');
      }

      let recipe = Recipe.build().toJSON();
      recipe.message = ""
      recipe.description = ""

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i + 1,
          scentCategory: '',
          scentName: '',
          drops: 0
        };
        recipe.formula.push(formula);
      }

      let scents = await Scent.findAllWithRelationFormatForApp()

      let totalDrops = 0;

      return res.view({user, recipe, scents, totalDrops});
    }
    catch (e) {
      res.serverError(e);
    }
  },

  show: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) return res.redirect('/login');

      const { recipe, editable, social } = await RecipeService.loadRecipe(id, currentUser);

      return res.view({ recipe, editable, social });
    } catch (e) {
      if (e === '404') return res.notFound();
      return res.serverError(e);
    }
  },

  preview: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) return res.redirect('/login');

      const { recipe, editable, social } = await RecipeService.loadRecipe(id, currentUser);

      const recipeJson = recipe.toJSON();
      if (recipeJson.UserId !== currentUser.id) {
        const message = "預覽功能僅限於您自己建立的配方！";
        return res.forbidden(message);
      }

      return res.view({ recipe, editable, social });
    } catch (e) {
      if (e === '404') return res.notFound();
      return res.serverError(e);
    }
  },

  order: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) return res.redirect('/login');

      const { recipe, editable, social } = await RecipeService.loadRecipe(id, currentUser);

      return res.view({ recipe, editable, social, user: currentUser });
    } catch (e) {
      if (e === '403') return res.notFound();
      return res.serverError(e);
    }
  },

  edit: async function(req, res) {
    try {
      let user = AuthService.getSessionUser(req);
      if (!user) {
        return res.redirect('/login');
      }

      const { id } = req.params;
      const scents = await Scent.findAllWithRelationFormatForApp()
      let recipe = await Recipe.findOne({
        where:{id},
        include: User
      });

      recipe = recipe.toJSON();

      if(recipe.User.id != user.id){
        const message = "只可維護自己的配方";
        // return res.forbidden({message});
        return res.forbidden(message);
      }
      user = recipe.User;
      let recipeFormula = recipe.formula;
      let formatFormula = [];
      let totalDrops = 0;

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i + 1,
          scentCategory: '',
          scentName: '',
          drops: 0
        };
        if(recipeFormula[i] != null){
          formula.drops = recipeFormula[i].drops;
          formula.scentName = recipeFormula[i].scent;
          formula.scentCategory = recipeFormula[i].scent.charAt(0);
        }

        totalDrops += parseInt(formula.drops, 10);

        formatFormula.push(formula);

      }
      recipe.formula = formatFormula;

      return res.view({user, recipe, scents, totalDrops});

    } catch (e) {
      return res.serverError(e);
    }
  },

  allpay: async function(req, res) {
    console.log('body=>', req.body);
    try {
      const { id } = req.params;
      const user = AuthService.getSessionUser(req);
      if (!user) return res.redirect('/login');

      const { recipient, phone, address, paymentMethod } = req.body;
      const verifyInputs = (() => {
        let verifyInputExists = 0;
        const hasRecipient = typeof recipient === 'string';
        const hasPhone = typeof phone === 'string';
        const hasAddress = typeof address === 'string';
        const hasPaymentMethod = typeof paymentMethod === 'string';

        const checkArray = [ hasRecipient, hasPhone, hasAddress, hasPaymentMethod ];
        for (var result of checkArray) {
          if (result) verifyInputExists += 1;
        }
        verifyInputExists = verifyInputExists === checkArray.length;
        if (!verifyInputExists) return res.forbidden('訂單資料缺失或不正確！');

        let verifyPaymentMethodValid = 0;
        const validPaymentMethods = [ 'ATM', 'Credit' ];
        for (var method of validPaymentMethods) {
          if (paymentMethod === method) verifyPaymentMethodValid += 1;
        }
        verifyPaymentMethodValid = verifyPaymentMethodValid > 0;;
        if (!verifyPaymentMethodValid) return res.forbidden('付款方式錯誤！');

        if (phone.indexOf(0) !== 0) return res.forbidden('收件人電話格式錯誤！');

        return true;
      })();
      if (!verifyInputs) return res.forbidden('訂單資料錯誤！');

      const { email, note, perfumeName, description, message } = req.body;

      let recipeOrder = await RecipeOrder.create({
        UserId: user.id,
        RecipeId: id,
        recipient,
        phone,
        address,
        email,
        note,
      });
      recipeOrder = await RecipeOrder.findByIdHasJoin(recipeOrder.id);

      const allPayData = await AllpayService.getAllpayConfig({
        relatedKeyValue: {
          RecipeOrderId: recipeOrder.id,
        },
        MerchantTradeNo: crypto.randomBytes(32).toString('hex').substr(0, 8),
        tradeDesc: `配方名稱：${perfumeName}, (備註：${message})`,
        totalAmount: 999,
        paymentMethod: paymentMethod,
        itemArray: recipeOrder.ItemNameArray,
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
