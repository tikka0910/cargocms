module.exports = {
  index: async function(req, res) {
    try {
      sails.log.info("=== enter index ===");
      let data = await Scent.findAllWithRelationFormatForApp();
      sails.log.info(data);
      return res.ok({
        data: {
          items: data,
        },
      });

    } catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    sails.log.info("=== find ===");
    try {
      const scents = await Scent.findAll();
      const scentArray = scents.map((scent) => {
        return {
          name: scent.name,
          id: scent.id,
        };
      });
      res.ok({
        data: {
          items: scentArray,
      }});
    } catch (e) {
      res.serverError({ message: e, data: {}});
    }
  },
}
