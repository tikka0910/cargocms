module.exports = {
  index: async function(req, res) {
    try {
      console.log("=== enter index ===");
      let data = await ScentNote.findAllWithRelation();
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
    console.log("=== find ===");
    try {
      let data = await ScentNote.findAllWithRelation();
      return res.ok({
        data: {
          items: data,
        },
      });
    } catch (e) {
      res.serverError({ message: e, data: {}});
    }
  },
}
