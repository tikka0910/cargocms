require("../../bootstrap.test.js")
describe.only('main login page test', () => {
  describe('get index title', () => {
    it('should be get broser title of Login @watch', () => {
      browser.url('http://localhost:1338/admin/login');
      expect(browser.getTitle()).to.equal('Login 2 | Unify - Responsive Website Template');
    });
    it('login as admin @watch', async (done) => {
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

    it('test user create @watch', async (done) => {
      try {
        browser.url('http://localhost:1338/admin/#/admin/user');
        await browser.waitForExist('#ToolTables_main-table_1',1000);
        browser.click('#ToolTables_main-table_1');
        await browser.waitForExist('[class="btn btn-primary"]',1000);
        browser.setValue('[name="username"]', 'usertest1');
        await browser.waitForValue('[name="username"]',500);
        browser.setValue('[name="email"]', 'usertest1@gmail.com');
        await browser.waitForValue('[name="email"]',500);
        browser.setValue('[name="firstName"]', '王');
        await browser.waitForValue('[name="firstName"]',500);
        browser.setValue('[name="lastName"]', '雇員');
        await browser.waitForValue('[name="lastName"]',500);
        browser.setValue('[name="password"]', '0000');
        await browser.waitForValue('[name="password"]',500);
        browser.setValue('[name="passwordConfirm"]', '0000');
        await browser.waitForValue('[name="passwordConfirm"]',500);
        browser.click('[class="btn btn-primary"]');
        await browser.waitForExist('[class="btn btn-primary"]',1000,true);
        // console.log(`!!!${browser.getText('[class="dataTables_info"]').text}`);
        expect(browser.elements('#ToolTables_main-table_1')!=null).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });

    it.skip('logout @watch', async (done) => {
      try {
        //await browser.pause(1000);//must
        browser.url('http://localhost:1338/logout?url=/admin/login');
        expect(browser.elements('[class="btn-u btn-u-blue btn-block rounded"]')!=null).to.equal(true);
        await browser.pause(2000);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
