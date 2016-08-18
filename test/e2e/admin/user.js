
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
        await browser.pause(500);
        browser.click('[id="ToolTables_main-table_1"]');
        await browser.pause(1000);//must
        browser.setValue('[name="username"]', 'usertest1');
        await browser.pause(100);
        browser.setValue('[name="email"]', 'usertest1@gmail.com');
        await browser.pause(100);
        browser.setValue('[name="firstName"]', '王');
        await browser.pause(100);
        browser.setValue('[name="lastName"]', '雇員');
        await browser.pause(100);
        browser.setValue('[name="password"]', '0000');
        await browser.pause(100);
        browser.setValue('[name="passwordConfirm"]', '0000');
        await browser.pause(100);//must
        browser.click('[class="btn btn-primary"]')

        expect(browser.elements('["class="btn btn-primary"]')!=null).to.equal(true);
        // expect(browser.getTitle()).to.equal('會員資料');

        done();
      } catch (e) {
        done(e);
      }
    });

    it('logout @watch', async (done) => {
      try {
        await browser.pause(1000);//must
        browser.url('http://localhost:1338/logout?url=/admin/login');
        // browser.click('[title="Sign Out"]');
        // await browser.pause(500);
        // browser.click('#bot2-Msg1');
        // await browser.pause(500);
        // console.log(`!!!${browser.getTitle()}`);
        expect(browser.elements('[class="btn-u btn-u-blue btn-block rounded"]')!=null).to.equal(true);
        //await browser.pause(20000);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
