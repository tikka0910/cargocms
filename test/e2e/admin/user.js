require("../../bootstrap.test.js")
describe.only('main login page test', () => {
  describe('get index title', () => {
    it('should be get broser title of Login @watch', () => {
      browser.url('http://localhost:1338/admin/login');
      expect(browser.getTitle()).to.equal('Login 2 | Unify - Responsive Website Template');
    });
    it('login as admin @watch', (done) => {
      try {
        browser.setValue('[name="identifier"]', 'admin')
        .setValue('[name="password"]', 'admin')
        .click('[class="btn-u btn-u-blue btn-block rounded"]');
        expect(browser.getTitle()).to.equal('控制台');
        done();
      } catch (e) {
        done(e);
      }
    });

    it('test user create @watch',async (done) => {
      try {
        const userData = {
          username: 'usertest1',
          email: 'usertest1@gmail.com',
          firstName: '王',
          lastName: '雇員',
          password: '0000'
        };
        // 新增
        browser.url('http://localhost:1338/admin/#/admin/user');
        browser.waitForExist('#ToolTables_main-table_1',1000)
        browser.click('#ToolTables_main-table_1');
        browser.waitForExist('[class="btn btn-primary"]',1000);
        //填入資料
        browser.setValue('[name="username"]', userData.username)
        .setValue('[name="email"]', userData.email)
        .setValue('[name="firstName"]', userData.firstName)
        .setValue('[name="lastName"]', userData.lastName)
        .setValue('[name="password"]', userData.password)
        .setValue('[name="passwordConfirm"]', userData.password);
        //送出
        browser.click('[class="btn btn-primary"]')
        .waitForExist('[class="btn btn-primary"]',1000,true);
        //檢查
        const res = await User.find({where: {username: userData.username}});
        res.username.should.be.eq(userData.username);
        res.email.should.be.eq(userData.email);

        // expect(browser.elements('#ToolTables_main-table_1')!=null).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });

    it.skip('logout @watch', (done) => {
      try {
        //await browser.pause(1000);//must
        browser.url('http://localhost:1338/logout?url=/admin/login');
        expect(browser.elements('[class="btn-u btn-u-blue btn-block rounded"]')!=null).to.equal(true);
        browser.pause(2000);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
