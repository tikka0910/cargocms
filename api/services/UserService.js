module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },

  findOne: async (userId) => {
    let data = false
    let message = '';
    try {
      sails.log.info('findOne user service=>', userId);
      const findUser = await User.findById(parseInt(userId, 10));
      if (findUser) {
        data = findUser.dataValues;
      } else {
        message = `user id ${userId} does not exist`;
      }
      return { data, message };
    } catch (e) {
      throw e;
    }
  },

  create: async ({
    username,
    email,
    firstName,
    lastName,
    locale,
    password,
  }) => {
    try {
      const user = await User.create({ username, email, firstName, lastName, locale });
      await Passport.create({ provider: 'local', password, UserId: user.id });
      return user;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  update: async (user = {
    id,
    username,
    email,
    firstName,
    lastName,
    locale,
  }) => {
    let data = false
    let message = '';
    try {
      sails.log.info('update user service=>', user);
      let updatedUser = await User.findById(parseInt(user.id, 10));
      if (updatedUser) {
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.firstName = user.firstName;
        updatedUser.lastName = user.lastName;
        updatedUser.locale = user.locale;
        updatedUser = await updatedUser.save();
        data = updatedUser.dataValues;
      } else {
        message = `user id ${userId} does not exist`;
      }
      return { data, message };
    } catch (e) {
      throw e;
    }
  },

  delete: async (userId) => {
    let data = false
    let message = '';
    try {
      sails.log.info('delete user service=>', userId);
      let deletedUser = await User.findById(parseInt(userId, 10));
      if (deletedUser) {
        deletedUser = await deletedUser.destroy();
        data = deletedUser.dataValues;
      } else {
        message = `user id ${userId} does not exist`;
      }
      return { data, message };
    } catch (e) {
      throw e;
    }
  }

}
