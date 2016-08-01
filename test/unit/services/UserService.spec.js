describe('about User Service operation.', function() {
  it('create User should success.', async (done) => {
    try {
      const newUser = {
        username: 'newUserService',
        email: 'newUser@xxx.xxx',
        firstName: 'test',
        lastName: 'test',
        locale: 'zh_TW',
      };
      const result = await UserService.create(newUser);
      sails.log.info('create user service spec=>', result);
      result.data.should.be.Object;
      result.data.username.should.be.equal(newUser.username);
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find user', () => {
    let findThisUser;
    before(async (done) => {
      try {
        findThisUser = await User.create({
          username: 'findThisUserService',
          email: 'findThisUserService@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('findThisUser=>', findThisUser);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const result = await UserService.findOne(findThisUser.dataValues.id);
        sails.log.info('find user service spec=>', result);
        result.data.should.be.Object;
        result.data.id.should.be.equal(findThisUser.dataValues.id);
        result.data.username.should.be.equal(findThisUser.dataValues.username);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('delete user', () => {
    let deleteThisUser;
    before(async (done) => {
      try {
        deleteThisUser = await User.create({
          username: 'deleteThisUserService',
          email: 'deleteThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const result = await UserService.delete(deleteThisUser.id);
        sails.log.info('delete user service spec=>', result);
        const findDeletedUser = await UserService.findOne(deleteThisUser.id);
        sails.log.info("findDeletedUser service spec=>", findDeletedUser);
        result.data.should.not.be.equal(false);
        findDeletedUser.data.should.be.equal(false);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update user', () => {
    let updateThisUser;
    const updatedUserWithJson = {
      username: 'updatedUserService',
      email: 'updatedUser@update.update',
      firstName: 'Kent',
      lastName: 'Chen',
      locale: 'hk',
    };
    before(async (done) => {
      try {
        updateThisUser = await User.create({
          username: 'updateThisUserService',
          email: 'updateThisUserService@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('updateThisUser=>', updateThisUser);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const result = await UserService.update({
          id: updateThisUser.id,
          ...updatedUserWithJson,
        });
        sails.log.info('update user service spec=>', result);
        result.data.id.should.be.equal(updateThisUser.dataValues.id);
        result.data.locale.should.be.equal(updatedUserWithJson.locale);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
