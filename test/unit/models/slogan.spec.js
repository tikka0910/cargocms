describe('About Slogan model operation', function(){
  describe('get Slogan',function(){

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

    it('Slogan model get slogan should be success', async (done) => {
      try{
        let result = await Slogan.findById( test_slogan.id );
        result.content.should.be.eq( test_slogan.content );
        result.source.should.be.eq( test_slogan.source );
        done();
      }
      catch(e){
        done(e);
      }
    });
  });
});
