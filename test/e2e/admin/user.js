require("../../bootstrap.test.js");

describe('Backend User management test 後台使用者管理測試', () => {

  describe('User operation',() => {
    before( (done) => {
      try{
        browser.url('http://localhost:1338/admin/login');
        browser.setValue('[type=text]', 'admin');
        browser.setValue('[type=password]', 'admin');
        browser.click('[type=submit]');
        done();
      }
      catch(e){
        done(e);
      }
    });

    after( (done) => {
      try{
        browser.pause(1000);
        browser.click('#logout');
        browser.waitForExist('#bot2-Msg1');
        browser.click('#bot2-Msg1');
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('create an user', (done) => {
      try{
        const userData = {
          name: 'Alice',
          email: 'alice@email.com',
          firstName: 'Alice',
          lastName: 'Eve',
          password: 'dadada'
        };

        browser.click('[title=資料維護]');
        browser.click('[title=會員資料]');

        browser.waitForExist('#ToolTables_main-table_1', 1000);
        browser.click('#ToolTables_main-table_1');

        browser.waitForExist('[name=username]');
        browser.setValue('[name=username]',userData.name);
        browser.setValue('[name=email]', userData.email);
        browser.setValue('[name=firstName]', userData.firstName);
        browser.setValue('[name=lastName]', userData.lastName);
        browser.setValue('[name=password]', userData.password);
        browser.setValue('[name=passwordConfirm]', userData.password);
        browser.click('[type=submit]');

        browser.pause(3000);
        browser.setValue('[type=search]', userData.name);

        browser.getText('#main-table > tbody > tr > td.expand > a').should.be.equal( userData.name );

        done();
      }
      catch(e){
        done(e);
      }
    });

    it('edit an user', (done) => {
      try{
        const targetUser = 'Alice';
        const userUpdate = {
          email: 'abc@efg.ijk',
          firstName: 'Molly',
          lastName: 'Joe'
        };

        browser.setValue('[type=search]', targetUser);
        browser.click('#main-table > tbody > tr.odd');
        browser.click('#ToolTables_main-table_2');

        browser.waitForExist('[name=username]');
        browser.setValue('[name=email]', userUpdate.email);
        browser.setValue('[name=firstName]', userUpdate.firstName);
        browser.setValue('[name=lastName]', userUpdate.lastName);
        browser.click('[type=submit]');

        browser.pause(3000);
        browser.setValue('[type=search]', targetUser );

        browser.click('#main-table > tbody > tr > td')
        browser.click('#ToolTables_main-table_0');

        browser.waitForExist('#main-show');
        browser.getText('#main-show > div > div > div > div > div > div > div > div > div.col-sm-12 > div > div.col-sm-6 > section > ul > li:nth-child(1) > p > a')
        .should.be.equal( userUpdate.email );

        done();
      }
      catch(e){
        done(e);
      }
    });

  });
});
