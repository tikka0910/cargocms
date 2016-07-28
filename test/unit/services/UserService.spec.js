describe('about User Service operation.', function() {
  it('create User should success.', async (done) => {
    try {
      const newUser = {
        username: 'xxxx',
        email: 'xxx@xxx.xxx',
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
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
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
        const result = await UserService.findOne(findThisUser.id);
        sails.log.info('find user service spec=>', result);
        result.data.should.be.Object;
        result.data.id.should.be.equal(findThisUser.id);
        result.data.username.should.be.equal(findThisUser.username);
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
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
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
    const updatedUser = {
      username: 'update',
      email: 'update@update.update',
      firstName: 'Kent',
      lastName: 'Chen',
      locale: 'hk',
    };
    before(async (done) => {
      try {
        updateThisUser = await User.create({
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
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
        const result = await UserService.update({
          id: updateThisUser.id,
          ...updatedUser,
        });
        sails.log.info('update user service spec=>', result);
        updateThisUser.locale.should.be.equal('zh_TW');
        result.data.id.should.be.equal(updateThisUser.id);
        result.data.locale.should.be.equal('hk');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
