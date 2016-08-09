describe('About Slogan Controller operation',function(){
  describe('Get one Slogan',function(){
    let test_slogan = null;
    before(async (done) => {
      try{
        test_slogan = await Slogan.create({
          content:'Just Do it.',
          source:'NIKE, Inc.'
        });
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('get one Slogan should be success', async (done) => {
      try{
        const result = await request(sails.hooks.http.app)
        .get(`/slogan/${test_slogan.id}`);

        result.data.content.should.be.eq(test_slogan.content);
        result.data.source.should.be.eq(test_slogan.source);
        done();
      }
      catch(e){
        done(e);
      }
    });
  });
});
