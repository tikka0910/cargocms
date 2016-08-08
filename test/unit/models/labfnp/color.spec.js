describe.only('test Color.spec model operation', function() {

  let createdColor, createdFormulas, createdScents;
  it('create Color Formula Scent should be success.', async (done) => {
    try {
      let newColor = {
          code: "#FFA500",
          title: "Cirtus 柑橘色"
      }
      createdColor = await Color.create(newColor);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Formula should be success.', async (done) => {
    try {
      let newFormulas = [
        {name: "T12"},
        {name: "M6"},
        {name: "TA53"}
      ]

      let promises = newFormulas.map((newFormula) => {
        return Formula.create(newFormula);
      })
      createdFormulas = await Promise.all(promises);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Scent should be success.', async (done) => {
    try {
      let newScents = [
        {title: "柚子清香"},
        {title: "清新"}
      ]

      let promises = newScents.map((newScent) => {
        return Scent.create(newScent);
      })
      createdScents = await Promise.all(promises);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('set relation of Color Formula Scent should be success.', async (done) => {
    try {
      await createdColor.setFormulas(createdFormulas);
      await createdFormulas[0].setScents(createdScents);
      done();
    } catch (e) {
      done(e);
    }
  });




  it('findOne should be success.', async (done) => {
    try {
      let perfumeName = '香水配方名';
      let {id} = createdColor

      let findColor = await Color.findOne({
        where: {id},
        include: [{
          model: Formula,
          include: Scent
        }]
      });
      let findFormulas = findColor.toJSON().Formulas
      let findScents = findFormulas[0].Scents;


      (findFormulas.length == 3).should.be.true;
      (findScents.length == 2).should.be.true;
      console.log(JSON.stringify(findColor.toJSON(), null, 2));

      done();
    } catch (e) {
      done(e);
    }
  });

});
