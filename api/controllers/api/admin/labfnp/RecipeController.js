

module.exports = {

  export: async (req, res) => {
    try {
      sails.log.info('export',req.query);
      let { query } = req;
      const modelName = req.options.controller.split("/").reverse()[0];

      let find = await ExportService.query({query, modelName});
      find = find.map((data) => data.toJSON());

      // TODO: format
      
      const result = await ExportService.export({
        json: find,
        fileName: modelName,
      });

      res.attachment(result.fileName);
      res.end(result.data, 'UTF-8');
    } catch (e) {
      res.serverError(e);
    }
  },
}
