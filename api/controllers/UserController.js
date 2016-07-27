module.exports = {
  index: async (req, res) => {
    try {
      let data = await UserService.findAll();
      res.ok({data});
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    try {
      let users = await UserService.findAll();
      res.ok({users});
    } catch (e) {
      res.serverError(e);
    }
  },
}
