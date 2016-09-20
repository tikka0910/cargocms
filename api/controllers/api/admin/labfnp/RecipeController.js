module.exports = {

  export: async (req, res) => {
    try {
      sails.log.info('export',req.query);
      res.ok({ message: 'export', data: {} });
    } catch (e) {
      res.serverError(e);
    }
  },
}
