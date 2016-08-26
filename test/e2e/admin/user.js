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

  it('Update user infomation', async(done) => {
    try{
      const updateTargetUser = 'usertest1';

      const userInfo = {
        username: 'BrooklynBackham',
        email: 'brooklynBay@email.com',
        firstName: 'Brooklyn',
        lastName: 'Backham',
        password: 'chloe'
      }

      //search user item
      browser.url('/admin/#/admin/user');
      browser.waitForExist('#main-table_filter input[type="search"]', 1000)
      browser.setValue('#main-table_filter input[type="search"]', updateTargetUser);

      browser
        .click('#main-table tbody')
        .click('#ToolTables_main-table_2');

      //loading edit page
      const updateUserInput = browser.element('#content');
      updateUserInput.waitForExist(1000);

      updateUserInput
        .setValue('[name="username"]', userInfo.username)
        .setValue('[name="email"]', userInfo.email)
        .setValue('[name="firstName"]', userInfo.firstName)
        .setValue('[name="lastName"]', userInfo.lastName);

      //save
      browser
        .click('#main-form footer button[type="submit"]')
        .waitForExist('#main-table-widget', 1000, true);

      //降冪排序
      browser.waitForExist('#main-table-widget tr th:nth-child(1)', 1000);
      browser.click('#main-table-widget tr th:nth-child(1)');

      //check
      const userUpdateField = browser.element('#main-table-widget tbody tr:nth-child(1) td:nth-child(4)').getText();
      const res = await User.find({where: {email: userInfo.email}});

      //檢查更新後資料庫data是否與前端呈現相符
      expect(res.email).to.be.equal(userUpdateField);

      done();
    }catch(e){
      done(e);
    }
  });

  describe('delete user', () => {
    let deleteThisUser;
    before(async (done) => {
      try {
        deleteThisUser = await User.create({
          username: `testDeleteWatch`,
          email: `testDeleteWatch@gmail.com`,
          firstName: 'test',
          lastName: 'DeleteWatch'
        });
        let passport = await Passport.create({provider: 'local', password: 'user', UserId: deleteThisUser.id});
        sails.log.info('deleteThisUser.id=>', deleteThisUser.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('delete @watch', async (done) => {

      try {
        //search user item
        browser.url('/admin/#/admin/user');
        //搜尋該user 進入編輯user頁面
        browser.waitForExist('#main-table_filter input[type="search"]', 1000);
        browser.setValue('#main-table_filter input[type="search"]', deleteThisUser.username);
        browser
          .click('#main-table tbody')
          .click('#ToolTables_main-table_2');
        //點擊刪除user
        browser.waitForExist('#main-form .btn.btn-danger', 1000);
        browser.click('#main-form .btn.btn-danger');
        //確定刪除
        browser.waitForExist('#bot1-Msg1', 1000);
        browser.click('#bot1-Msg1');
        //等待後端完成刪除 跳轉回user列表
        browser.waitForExist('#main-table_filter input[type="search"]', 3000);

        let res = await User.find({
          where: {
            username: deleteThisUser.username
          }
        });
        (res === null).should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });
  });



});
