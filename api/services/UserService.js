module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },

  findOne: async (userId) => {
    let result = false
    let msg = '';
    try {
      console.log('findOne user service=>', userId);
      const findUser = await User.findById(parseInt(userId, 10));
      if (findUser) {
        result = findUser.dataValues;
      } else {
        msg = `user id ${userId} does not exist`;
      }
      return { result, msg };
    } catch (e) {
      throw e;
    }
  },

  create: async (user = {
    username,
    email,
    firstName,
    lastName,
    locale
  }) => {
    let result = false;
    try {
      console.log('create user service=>', user);
      const createdUser = await User.create(user);
      return { result: createdUser.dataValues };
    } catch (e) {
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
    let result = false
    let msg = '';
    try {
      console.log('update user service=>', user);
      let updatedUser = await User.findById(parseInt(user.id, 10));
      if (updatedUser) {
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.firstName = user.firstName;
        updatedUser.lastName = user.lastName;
        updatedUser.locale = user.locale;
        updatedUser = await updatedUser.save();
        result = updatedUser.dataValues;
      } else {
        msg = `user id ${userId} does not exist`;
      }
      return { result, msg };
    } catch (e) {
      throw e;
    }
  },

  delete: async (userId) => {
    let result = false
    let msg = '';
    try {
      console.log('delete user service=>', userId);
      let deletedUser = await User.findById(parseInt(userId, 10));
      if (deletedUser) {
        deletedUser = await deletedUser.destroy();
        result = deletedUser.dataValues;
      } else {
        msg = `user id ${userId} does not exist`;
      }
      return { result, msg };
    } catch (e) {
      throw e;
    }
  }

}
