require("../../bootstrap.test.js")
describe.only('main login page test', () => {
  describe('get index title', () => {
    it('should be get broser title of Login @watch', () => {
      browser.url('http://localhost:1338/admin/login');
      expect(browser.getTitle()).to.equal('Login 2 | Unify - Responsive Website Template');
    });
    it('login as admin @watch', (done) => {
      try {
        browser.setValue('[name="identifier"]', 'admin');
        browser.setValue('[name="password"]', 'admin');
        browser.click('[class="btn-u btn-u-blue btn-block rounded"]');
        expect(browser.getTitle()).to.equal('控制台');
        done();
      } catch (e) {
        done(e);
      }
    });

    it('test user create @watch', (done) => {
      try {
        const userData = {
          name: 'usertest1',
          email: 'usertest1@gmail.com',
          firstName: '王',
          lastName: '雇員',
          password: '0000'
        };
        browser.url('http://localhost:1338/admin/#/admin/user');
        browser.waitForExist('#ToolTables_main-table_1',1000);
        browser.click('#ToolTables_main-table_1');
        browser.waitForExist('[class="btn btn-primary"]',1000);
        browser.setValue('[name="username"]', userData.name);
        // await browser.waitForValue('[name="username"]',500);
        browser.setValue('[name="email"]', userData.email);
        // await browser.waitForValue('[name="email"]',500);
        browser.setValue('[name="firstName"]', userData.firstName);
        // await browser.waitForValue('[name="firstName"]',500);
        browser.setValue('[name="lastName"]', userData.lastName);
        // await browser.waitForValue('[name="lastName"]',500);
        browser.setValue('[name="password"]', userData.password);
        // await browser.waitForValue('[name="password"]',500);
        browser.setValue('[name="passwordConfirm"]', userData.password);
        // await browser.waitForValue('[name="passwordConfirm"]',500);
        browser.click('[class="btn btn-primary"]');
        browser.waitForExist('[class="btn btn-primary"]',1000,true);

        browser.setValue('[type=search]', userData.name);
        browser.getText('#main-table > tbody > tr > td.expand > a').should.be.equal( userData.name );

        // expect(browser.elements('#ToolTables_main-table_1')!=null).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('logout @watch', (done) => {
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
