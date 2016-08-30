module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        result = await PagingService.process({query, modelName});
      } else {
        const items = await sails.models[modelName].findAll();
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
      const item = await Allpay.findOne({ id });
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
      const item = await Allpay.update(data ,{
        where: { id, },
      });
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  paid: async (req, res) => {
    try {
      const data = req.body;
      sails.log.info(data);
      await AllpayService.paid(data);
      return res.ok('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  },

  paymentinfo: async(req, res) => {
    try {
      const data = req.body;
      sails.log.info(data);
      await AllpayService.paymentinfo(data);
      return res.ok('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  }
}
