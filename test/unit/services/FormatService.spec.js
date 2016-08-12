describe('about Format Service operation.', function() {
  it('gen format', async (done) => {
    try {
      const result = FormatService.getQueryObj({ draw: '1',
        columns:
         [ { data: 'id', name: '' },
           { data: 'username', name: '' },
           { data: 'displayName', name: '' },
           { data: 'email', name: '' },
           { data: 'lastLogin', name: '' },
           { data: '5', name: '' } ],
        order: [ { column: '2', dir: 'asc' } ],
        start: '0',
        length: '10',
        search: { value: 'userX', regex: 'false' },
        _: '1470989140227'
      });
      sails.log.debug(JSON.stringify(result, null, 2));
      result.where.should.be.Object;
      result.where.$or.should.be.Array;
      result.where.$or[0].id.$like.should.be.String;
      result.where.$or[0].id.$like.should.be.String;
      result.order[0].should.be.Array;
      result.order[0][0].should.be.Array;
      done();
    } catch (e) {
      done(e)
    }
  });
});
