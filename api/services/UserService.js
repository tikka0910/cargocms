module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
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
    Passports,
  }) => {
    try {
      const user = await User.create({ username, email, firstName, lastName, locale });
      await Passport.create({
        provider: 'local',
        password: Passports[0].password,
        UserId: user.id
      });
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
    Passports,
    Roles
  }) => {
    try {
      sails.log.info('update user service=>', user);
      let updatedUser = await User.findOne({
        where: {
          id: parseInt(user.id, 10)
        },
        include: Passport,
      });
      if (updatedUser) {
        const passport = await Passport.findById(updatedUser.Passports[0].id);
        const isOldPassword = await passport.validatePassword(user.Passports[0].password, passport);
        if (!isOldPassword) {
          passport.password = user.Passports[0].password;
          await passport.save();
        }
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.firstName = user.firstName;
        updatedUser.lastName = user.lastName;
        updatedUser.locale = user.locale;

        const userRoles = await Role.findAll({
          where: {
            authority: user.Roles
          }
        });
        await updatedUser.setRoles(userRoles);
        updatedUser = await updatedUser.save();
      }
      return updatedUser;
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
