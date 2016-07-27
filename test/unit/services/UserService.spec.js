describe('about User Service operation.', function() {
  it('create User should success.', async (done) => {
    try {
      const data = {
        username: 'xxxx',
        email: 'xxx@xxx.xxx',
        firstName: 'test',
        lastName: 'test',
        locale: 'zh_TW',
      };
      const user = await UserService.create(data);
      console.log('create user service spec=>', user);
      user.result.should.be.Object;
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
        const user = await UserService.findOne(findThisUser.id);
        console.log('find user service spec=>', user);
        user.result.should.be.Object;
        user.result.id.should.be.equal(findThisUser.id);
        user.result.username.should.be.equal(findThisUser.username);
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
        const user = await UserService.delete(deleteThisUser.id);
        console.log('delete user service spec=>', user);
        const findDeletedUser = await UserService.findOne(deleteThisUser.id);
        console.log("findDeletedUser service spec=>", findDeletedUser);
        user.result.should.not.be.equal(false);
        findDeletedUser.result.should.be.equal(false);
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
        const user = await UserService.update({
          id: updateThisUser.id,
          ...updatedUser,
        });
        console.log('update user service spec=>', user);
        updateThisUser.locale.should.be.equal('zh_TW');
        user.result.id.should.be.equal(updateThisUser.id);
        user.result.locale.should.be.equal('hk');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
