describe('about User Controller operation.', function() {
  let duplicateUserName;
  let duplicateUserEmail;
  let duplicateUserNameEmail;
  before(async (done) => {
    try {
      duplicateUserName = await UserService.create({
        username: 'aaa',
        email: 'aaa@aaa.aaa',
        firstName: 'test',
        lastName: 'test',
        locale: 'zh_TW',
      });
      duplicateUserEmail = await UserService.create({
        username: 'bbb',
        email: 'bbb@bbb.bbb',
        firstName: 'test',
        lastName: 'test',
        locale: 'zh_TW',
      });
      duplicateUserNameEmail = await UserService.create({
        username: 'ccc',
        email: 'ccc@ccc.ccc',
        firstName: 'test',
        lastName: 'test',
        locale: 'zh_TW',
      });
      sails.log.info('duplicateUserName.data.id=>', duplicateUserName.data.id);
      sails.log.info('duplicateUserEmail.data.id=>', duplicateUserEmail.data.id);
      sails.log.info('duplicateUserNameEmail.data.id=>', duplicateUserNameEmail.data.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create User should success.', async (done) => {
    const createThisUser = {
      username: 'xxxx',
      email: 'xxx@xxx.xxx',
      firstName: 'test',
      lastName: 'test',
      locale: 'zh_TW',
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/user`)
      .send(createThisUser);
      sails.log.info('create user controller spec =>', res.body);
      res.body.should.be.Object;
      res.body.data.email.should.be.equal(createThisUser.email);
      res.body.data.locale.should.be.equal('zh_TW');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create user with duplicate username should failed.', async (done) => {
    const createThisUser = {
      username: duplicateUserName.data.username,
      email: 'createThisUserWithDuplicateUserName@xxx.xxx',
      firstName: 'test',
      lastName: 'test',
      locale: 'zh_TW',
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/user`)
      .send(createThisUser);
      sails.log.info('create user controller spec =>', res.body);
      res.body.success.should.be.equal(false);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create user with duplicate email should failed.', async (done) => {
    const createThisUser = {
      username: 'createThisUserWithDuplicateEmail',
      email: duplicateUserName.data.email,
      firstName: 'test',
      lastName: 'test',
      locale: 'zh_TW',
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/user`)
      .send(createThisUser);
      sails.log.info('create user controller spec =>', res.body);
      res.body.success.should.be.equal(false);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create user with duplicate username and email should failed.', async (done) => {
    const createThisUser = {
      username: duplicateUserNameEmail.data.username,
      email: duplicateUserNameEmail.data.email,
      firstName: 'test',
      lastName: 'test',
      locale: 'zh_TW',
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/user`)
      .send(createThisUser);
      sails.log.info('create user controller spec =>', res.body);
      res.body.success.should.be.equal(false);
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find all users', () => {
    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app).get(`/user`);
        sails.log.info('find users controller spec =>', res.body);
        res.body.data.should.be.Array;
        res.body.success.should.be.equal(true);
        res.body.data.items.length.should.be.above(0);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('find one user', () => {
    let findThisUser;
    before(async (done) => {
      try {
        findThisUser = await UserService.create({
          username: 'findThisUser',
          email: 'findThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('findThisUser.data.id=>', findThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/user/${findThisUser.data.id}`);
        sails.log.info('find one user controller spec =>', res.body);
        res.body.data.should.be.Object;
        res.body.data.id.should.be.Number;
        res.body.data.id.should.be.equal(findThisUser.data.id);
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
        deleteThisUser = await UserService.create({
          username: 'deleteThisUser',
          email: 'deleteThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('deleteThisUser.data.id=>', deleteThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .delete(`/user/${deleteThisUser.data.id}`);
        sails.log.info('delete user controller spec =>', res.body);
        res.body.data.id.should.be.equal(deleteThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update user', () => {
    let updateThisUser;
    const updatedUser = {
      username: 'updated',
      email: 'update@update.update',
      firstName: 'Kent',
      lastName: 'Chen',
      locale: 'hk',
    };
    before(async (done) => {
      try {
        updateThisUser = await UserService.create({
          username: 'updateThisUser',
          email: 'updateThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('updateThisUser.data.id=>', updateThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .put(`/user/${updateThisUser.data.id}`)
        .send(updatedUser);
        res.body.data.locale.should.be.equal('hk');
        res.body.data.username.should.be.equal('updated');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
