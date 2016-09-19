var sinon = require('sinon');
describe('about LikeRecipe Controller operation.', function() {

  let recipe;
  before(async (done) => {
    try {
      let user = await User.create({
        username: 'JohnGettingCSV',
        email: 'JohnGettingCSV@gmail.com',
        password: ''
      });
      sinon.stub(AuthService, 'getSessionUser', (req) => {
        return user.toJSON();
      });
      recipe = await Recipe.create({
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'John test perfume',
        message: 'this is love test',
        UserId: user.id,
      });
      done()
    } catch (e) {
      done(e)
    }
  });

  after((done) => {
    AuthService.getSessionUser.restore();
    done();
  });

  it('Recipe to CSV should be success.', async (done) => {
    try {
      const webForm = { draw: '1',
        type: 'csv',
        columns:[
           { data: 'id', name: '' },
           { data: 'perfumeName', name: '', "searchable": "true"},
           { data: 'authorName', name: '' , "searchable": "true"}
           { data: 'createdAt', name: '', "searchable": "false"},
           { data: 'updatedAt', name: '', "searchable": "false"},
           { data: 'visibility', name: '', "searchable": "false"},
           { data: 'productionStatus', name: '', "searchable": "false"},
           { data: 'description', name: '', "searchable": "false"},
           { data: 'message', name: '', "searchable": "false"},
           { data: 'formula', name: '', "searchable": "false"},
        ],
        order: [ { column: '0', dir: 'asc' } ],
        search: { value: 'John', regex: 'false' },
        _: '1470989140227'
      }
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/labfnp/recipe/export`).form(webForm)
      res.status.should.be.eq(200);
      done();
    } catch (e) {
      done(e);
    }
  });

});
