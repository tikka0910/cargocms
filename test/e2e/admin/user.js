require("../../bootstrap.test.js")
import {login, logout} from "../../util/e2eHelper.js"

describe('test user', () => {
  before((done)=>{
    try {
      login("admin");
      done();
    } catch (e) {
      done(e);
    }
  })
  after((done)=>{
    try {
      logout();
      done();
    } catch (e) {
      done(e);
    }
  })

  it('create @watch',async (done) => {
    try {
      const userData = {
        username: 'usertest1',
        email: 'usertest1@gmail.com',
        firstName: '王',
        lastName: '雇員',
        password: '0000'
      };
      // 新增
      browser.url('/admin/#/admin/user');
      browser.waitForExist('#ToolTables_main-table_1',2000)
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



});
