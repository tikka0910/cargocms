module.exports = {
  index: async (req, res) => {
    try {
      const data = await UserService.findAll();
      res.ok(data);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    const { userId } = req.params;
    try {
      sails.log.info('findOne user controller=>', userId);
      const user = await UserService.findOne(userId);
      res.ok(user);
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      sails.log.info('create user controller=>', data);
      const user = await UserService.create(data);
      res.ok(user);
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { userId } = req.params;
    const data = req.body;
    try {
      sails.log.info('update user controller userId=>', userId);
      sails.log.info('update user controller data=>', data);
      const user = await UserService.update({
        id: userId,
        ...data,
      });
      res.ok(user);
    } catch (e) {
      res.serverError(e);
    }
  },

  delete: async (req, res) => {
    const { userId } = req.params;
    try {
      sails.log.info('delete user controller=>', userId);
      const user = await UserService.delete(userId);
      res.ok(user);
    } catch (e) {
      res.serverError(e);
    }
  },
}
