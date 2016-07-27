describe('about User Controller operation.', function() {
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
      sails.log.info('create user spec =>', res.body);
      res.body.should.be.Object;
      res.body.result.email.should.be.equal(createThisUser.email);
      res.body.result.locale.should.be.equal('zh_TW');
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find all users', () => {
    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app).get(`/user`);
        sails.log.info('find users spec =>', res.body);
        res.body.should.be.Array;
        res.body.length.should.be.Number;
        res.body.length.should.be.above(0);
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
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('findThisUser.result.id=>', findThisUser.result.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/user/${findThisUser.result.id}`);
        sails.log.info('find one user spec =>', res.body);
        res.body.result.should.be.Object;
        res.body.result.id.should.be.Number;
        res.body.result.id.should.be.equal(findThisUser.result.id);
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
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('deleteThisUser.result.id=>', deleteThisUser.result.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .delete(`/user/${deleteThisUser.result.id}`);
        sails.log.info('delete user spec =>', res.body);
        res.body.result.id.should.be.equal(deleteThisUser.result.id);
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
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('updateThisUser.result.id=>', updateThisUser.result.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .put(`/user/${updateThisUser.result.id}`)
        .send(updatedUser);
        res.body.result.locale.should.be.equal('hk');
        res.body.result.username.should.be.equal('updated');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
