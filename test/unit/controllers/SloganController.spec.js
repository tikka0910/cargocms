describe.only('About Slogan Controller operation', function(){

  let test_slogan = null
  before( async (done) => {
    try{
      test_slogan = await Slogan.create({
        content:'Jsut Do It.',
        source:'NIKE Inc.'
      });
      done();
    }
    catch(e){
      done(e);
    }
  });

  it('Create Slogan should success',async (done) =>{
    const createSlogan = {
      content:'Connecting people.',
      source:'Nokia Inc.',
    };
    try{
      const result = await request(sails.hooks.http.app)
      .post(`/api/admin/slogan`)
      .send(createSlogan);

      sails.log.info('Create slogan controller spec =>', result.body);
      result.body.should.be.Object;
      result.body.data.content.should.be.equal(createSlogan.content);

      done();
    }
    catch(e){
      done(e);
    }
  });

  describe('find all Slogans', () =>{
    it('should success',async (done) => {
      try{
        let result = await request(sails.hooks.http.app)
        .get(`/api/admin/slogan`);

        sails.log.info('find slogan controller spec =>', result.body);
        result.body.data.items.should.be.Array;
        result.body.data.items.length.should.be.above(0);

        done();
      }
      catch(e){
        done(e);
      }
    });
  });


  describe('find a Slogan', () =>{
    let findThisSlogan;
    before(async (done) =>  {
      try{
        findThisSlogan = await Slogan.create({
          content:'Im lovein it',
          source:"McDonald"
        });

        sails.log.info('findThisSlogan.id =>', findThisSlogan.id);
        done();
      }
      catch(e){
        done(e);
      }

    });

    it('should success', async (done) =>{
      try{
        let result = await request(sails.hooks.http.app)
        .get(`/api/admin/slogan/${findThisSlogan.id}`);

        sails.log.info('find slogan controller spec =>', result.body);
        result.body.should.be.Object;
        result.body.data.content.should.be.equal(findThisSlogan.content);
        done();
      }
      catch(e){
        done(e);
      }
    });
  });


  describe('Update Slogan', () => {
    let updateThisSlogan;
    const updateSlogan = {
      content: 'Gives You Wings.',
      source:'RedBull Inc.'
    };

    before( async (done) => {
      try{
        updateThisSlogan = await Slogan.create({
          content:'this for update',
          source:'modify me'
        });

        sails.log.info('updateThisSlogan.id =>', updateThisSlogan.id);
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('Should success', async (done) =>{
      try{
        let result = await request(sails.hooks.http.app)
        .put(`/api/admin/slogan/${updateThisSlogan.id}`)
        .send(updateSlogan);

        result.status.should.eq(200);
        result.body.data.content.should.be.equal(updateSlogan.content);
        done();
      }
      catch(e){
        done(e);
      }
    });
  });


  describe('Delete Slogan', () => {
    let delThisSlogan;
    before(async (done) => {
      try{
        delThisSlogan = await Slogan.create({
          content:'welcome to the hell',
          source:'qqq'
        });

        sails.log.info('delThisSlogan.id =>' ,delThisSlogan.id);
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('Should success', async (done) =>{
      try{
        let result = await request(sails.hooks.http.app)
        .delete(`/api/admin/slogan/${delThisSlogan.id}`);

        result.body.success.should.be.true;
        done();
      }
      catch(e){
        done(e);
      }
    });
  });


});
