module.exports = {
  follow: async (req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) res.forbidden();
      const data = { follower: loginUser.id, following: id };
      await Follow.findOrCreate({
        where: data,
        defaults: data
      });
      res.ok({ message: `follow ${id} success.`, data: {} });
    } catch (e) {
      res.serverError(e);
    }
  },

  unfollow: async (req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) res.forbidden();
      await Follow.destroy({
        where: {
          follower: loginUser.id,
          following: id,
        },
      });
      res.ok({ message: `unfollow ${id} success.`, data: {} });
    } catch (e) {
      res.serverError(e);
    }
  },

}
