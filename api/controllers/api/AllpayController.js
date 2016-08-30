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
