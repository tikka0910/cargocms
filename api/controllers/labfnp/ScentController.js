module.exports = {
  index: async function(req, res) {
    try {
      console.log("=== enter index ===");
      let data = await Scent.findAllWithRelationFormatForApp();
      return res.ok({data})

    } catch (e) {
      console.log(e);
      res.serverError(e);
    }
  }
}
