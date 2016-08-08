describe.only('test LabfnpRecipe.spec model operation', function() {

  let row1;



  it('create should be success.', async (done) => {
    try {
      let newLabfnpRecipe = {
        formula: [{ name: 'B5', drop: 3}, { name: 'B5', drop: 2 }, { name: 'T14', drop: 5 }],
        authorName: '作者名',
        perfumeName: '香水配方名'
      }


      let createdLabfnpRecipe = await LabfnpRecipe.create(newLabfnpRecipe);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('findOne should be success.', async (done) => {
    try {
      let perfumeName = '香水配方名';


      let createdLabfnpRecipe = await LabfnpRecipe.findOne({where: {perfumeName}});
      console.log(createdLabfnpRecipe.toJSON());

      done();
    } catch (e) {
      done(e);
    }
  });

});
