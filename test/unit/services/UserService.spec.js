describe('about User Service operation.', function() {
  it('create User should success.', async (done) => {
    try {
      const newUser = {
        username: 'newUserService',
        email: 'newUser@xxx.xxx',
        firstName: 'test',
        lastName: 'test',
        locale: 'zh_TW',
        password: '123123123'
      };
      const result = await UserService.create(newUser);
      sails.log.info('create user service spec=>', result);
      result.should.be.Object;
      result.username.should.be.equal(newUser.username);
      done();
    } catch (e) {
      done(e);
    }
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
        const findDeletedUser = await User.findById(deleteThisUser.id);
        result.data.should.not.be.equal(false);
        (findDeletedUser === null ).should.be.true;
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
      Passports: [{ password: '000000' }],
    };
    let originPassport;
    before(async (done) => {
      try {
        updateThisUser = await User.create({
          username: 'updateThisUserService',
          email: 'updateThisUserService@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
          Roles: [ 'admin', 'user' ]
        });
        originPassport = await Passport.create({provider: 'local', password: '123123', UserId: updateThisUser.id});
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
        result.id.should.be.equal(updateThisUser.dataValues.id);
        result.locale.should.be.equal(updatedUserWithJson.locale);

        let resultPassport = await Passport.findById(originPassport.id);
        resultPassport.password.should.be.not.equal(
          originPassport.password
        );
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
