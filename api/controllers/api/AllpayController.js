module.exports = {

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
