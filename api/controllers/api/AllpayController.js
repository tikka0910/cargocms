import allPayPaymentTypeJson from '../../../config/allpayPaymentType.json';

module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = {
          model: RecipeOrder,
          include: [User, Recipe]
        }
        result = await PagingService.process({ query, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include:{
            model: RecipeOrder,
            include: [User, Recipe]
          }
        });
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Allpay.findOne({
        where:{
          id
        },
        include:{
          model: RecipeOrder,
          include: [User, Recipe]
        }
       });
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const message = 'Update success.';
      //allpay , recipeOrder 分拆更新資料
      // const allpayData = {
      //   TradeNo: data.TradeNo,
      //   MerchantTradeNo: data.MerchantTradeNo,
      //   RtnCode: data.RtnCode,
      //   RtnMsg: data.RtnMsg,
      //   PaymentDate: data.PaymentDate,
      //   TradeDate: data.TradeDate,
      //   PaymentType: data.PaymentType,
      //   ShouldTradeAmt: data.ShouldTradeAmt,
      //   TradeAmt: data.TradeAmt,
      //   BankCode: data.BankCode,
      //   vAccount: data.vAccount,
      //   ExpireDate: data.ExpireDate,
      //   PaymentNo: data.PaymentNo,
      //   Barcode1: data.Barcode1,
      //   Barcode2: data.Barcode2,
      //   Barcode3: data.Barcode3,
      //   CheckMacValue: data.CheckMacValue,
      //   MerchantTradeDate: data.MerchantTradeDate,
      //   RecipeOrderId: data.RecipeOrderId,
      // };
      const recipeData = {
        recipient: data.Recipient,
        address: data.Address,
        phone: data.Phone,
        email: data.Email,
        note: data.Note,
        remark: data.Remark,
      };

      // const allpay = await Allpay.update(allpayData ,{
      //   where: { id, },
      // });

      const order = await RecipeOrder.update(recipeData, {
        where: { id: data.RecipeOrderId, },
      });

      res.ok({ message, data: { order } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const recipeOrder = await Allpay.findOne({
        where:{
          id
        },
        include:{
          model: RecipeOrder,
          include: [User, Recipe]
        }
       });

      const allpay = await Allpay.deleteById(id);
      const order = await RecipeOrder.deleteById(recipeOrder.RecipeOrderId);

      const message = 'Delete success.';
      res.ok({ message, data: { allpay, order } });
    } catch (e) {
      res.serverError(e);
    }
  },

  paid: async (req, res) => {
    try {
      const data = req.body;
      sails.log.info(data);
      const allpay = await AllpayService.paid(data);

      //  create and send message
      let messageConfig = {};
      messageConfig.serialNumber = allpay.TradeNo;
      if (allpay.RecipeOrderId) {
        const recipeOrder = await RecipeOrder.findByIdHasJoin(allpay.RecipeOrderId);
        messageConfig.email = recipeOrder.email;
        messageConfig.username = recipeOrder.User.displayName;
      }
      messageConfig = await MessageService.paymentConfirm(messageConfig);
      const message = await Message.create(messageConfig);
      await MessageService.sendMail(message);

      res.send('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  },

  paymentinfo: async(req, res) => {
    try {
      const data = req.body;
      sails.log.info(data);
      const allpay = await AllpayService.paymentinfo(data);

      //  create and send message
      let messageConfig = {};
      messageConfig.serialNumber = allpay.TradeNo;
      messageConfig.paymentTotalAmount = allpay.ShouldTradeAmt;
      messageConfig.bankName = allPayPaymentTypeJson[allpay.PaymentType] || allpay.PaymentType;
      messageConfig.bankId = allpay.BankCode;
      messageConfig.accountId = allpay.vAccount;
      messageConfig.expireDate = allpay.ExpireDate;
      if (allpay.RecipeOrderId) {
        const recipeOrder = await RecipeOrder.findByIdHasJoin(allpay.RecipeOrderId);
        messageConfig.productName = recipeOrder.Recipe.perfumeName + ' 100 ml';
        messageConfig.email = recipeOrder.email;
        messageConfig.username = recipeOrder.User.displayName;
        messageConfig.shipmentUsername = recipeOrder.recipient;
        messageConfig.shipmentAddress = recipeOrder.address;
        messageConfig.note = recipeOrder.note;
        messageConfig.phone = recipeOrder.phone;
        messageConfig.invoiceNo = recipeOrder.invoiceNo;
      }
      messageConfig = await MessageService.orderConfirm(messageConfig);
      const message = await Message.create(messageConfig);
      await MessageService.sendMail(message);

      res.send('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  }
}
