require("../../bootstrap.test.js");

describe('Backend User management test 後台使用者管理測試', () => {

  describe('User operation',() => {
    before( (done) => {
      try{
        browser.url('http://localhost:1338/admin/login');
        browser.setValue('[type=text]', 'admin')
        .setValue('[type=password]', 'admin')
        .click('[type=submit]');
        done();
      }
      catch(e){
        done(e);
      }
    });

    after( (done) => {
      try{
        //admin logout
        browser.url('http://localhost:1338/logout?url=/admin/login');
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('create an user', async (done) => {
      try{
        const userData = {
          name: 'Alice',
          email: 'alice@email.com',
          firstName: 'Alice',
          lastName: 'Eve',
          password: 'dadada'
        };

        browser.click('[title=資料維護]')
        .click('[title=會員資料]');

        browser.waitForExist('#ToolTables_main-table_1');
        browser.click('#ToolTables_main-table_1');

        browser.waitForExist('[name=username]')
        browser.setValue('[name=username]',userData.name)
        .setValue('[name=email]', userData.email)
        .setValue('[name=firstName]', userData.firstName)
        .setValue('[name=lastName]', userData.lastName)
        .setValue('[name=password]', userData.password)
        .setValue('[name=passwordConfirm]', userData.password)
        .click('[type=submit]');

        // wait for data write in to database
        //wait for table show up
        browser.waitForExist('#main-table',5000);

        const user = await User.find({where: {username: userData.name}});
        user.username.should.be.equal(userData.name);
        user.email.should.be.equal(userData.email);

        done();
      }
      catch(e){
        done(e);
      }
    });

    it('edit an user', async (done) => {
      try{
        const targetUser = 'Alice';
        const userUpdate = {
          email: 'abc@efg.ijk',
          firstName: 'Molly',
          lastName: 'Joe'
        };
        browser.waitForExist('[type=search]');
        browser.setValue('[type=search]', targetUser)
        .click('#main-table > tbody > tr.odd')
        .click('#ToolTables_main-table_2');

        browser.waitForExist('[name=username]');
        browser.setValue('[name=email]', userUpdate.email)
        .setValue('[name=firstName]', userUpdate.firstName)
        .setValue('[name=lastName]', userUpdate.lastName)
        .click('[type=submit]');

        // wait data write in to database
        //wait for table show up
        browser.waitForExist('#main-table',5000);

        const user = await User.find({where:{username: targetUser}});
        user.email.should.be.equal(userUpdate.email);

        done();
      }
      catch(e){
        done(e);
      }
    });

    it('Delete user', async (done) => {
      try{
        const targetUser = 'Alice';

        browser.waitForExist('[type=search]');
        browser.setValue('[type=search]', targetUser)
        .click('#main-table > tbody > tr.odd')
        .click('#ToolTables_main-table_2');

        browser.waitForExist('[name=username]');
        browser.click('button.btn.btn-danger.pull-left');
        browser.waitForExist('#bot1-Msg1');
        browser.click('#bot1-Msg1');

        //wait database update.
        //wait for table show up
        browser.waitForExist('#main-table',5000);

        const user = await User.find({where: { username: targetUser}});
        (user === null).should.be.true;
        done();
      }
      catch(e){
        done(e);
      }
    });
  });
});
