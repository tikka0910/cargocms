describe.skip('about User Controller operation.', function() {
  it('create User should success.', async (done) => {
    done(new Error('no implement'));
  });

  describe('find user', () => {
    it('should success.', async (done) => {
      try {
        let res = await request(sails.hooks.http.app).get(`/user/find`);
        let {users} = res.body;
        users.should.be.Array;
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('delete user', () => {
    before(async (done) => {
      try {
        const testUser = UserService.create({
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
          age: 25,
        });
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
                        .delete(`/user/${testUser.id}`);
        const { result } = res.body;
        result.should.be.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update user', () => {
    before(async (done) => {
      try {
        const createdUsed = UserService.crate({
          username: 'xxxx',
          email: 'xxx@xxx.xxx',
          age: 25,
        });
        const updatedUser = {
          username: 'update',
          email: 'update@update.update',
          age: 999,
        };
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
                          .put(`/user/${createdUsed.id}`);
        const { user } = res.body;
        user.age.should.be.equal(999);
        user.username.should.be.equal('update');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
