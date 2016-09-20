
module.exports = {

  export: async (req, res) => {
    try {
      sails.log.info('export',req.query);
      let { query } = req;
      const modelName = req.options.controller.split("/").reverse()[0];
      const items = await ExportService.export({query, modelName);
      res.ok({ message: 'export', data: { items }});
    } catch (e) {
      res.serverError(e);
    }
  },
}
