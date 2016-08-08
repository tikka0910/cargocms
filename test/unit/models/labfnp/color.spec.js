describe.only('test ScentNote.spec model operation', function() {

  let createdScentNote, createdScents, createdFeels;
  it('create ScentNote Scent Feel should be success.', async (done) => {
    try {
      let newScentNote = {
          code: "#FFA500",
          title: "Cirtus 柑橘色"
      }
      createdScentNote = await ScentNote.create(newScentNote);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Scent should be success.', async (done) => {
    try {
      let newScents = [
        {name: "T12"},
        {name: "M6"},
        {name: "TA53"}
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

  it('create Feel should be success.', async (done) => {
    try {
      let newFeels = [
        {title: "柚子清香"},
        {title: "清新"}
      ]

      let promises = newFeels.map((newFeel) => {
        return Feel.create(newFeel);
      })
      createdFeels = await Promise.all(promises);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('set relation of ScentNote Scent Feel should be success.', async (done) => {
    try {
      await createdScentNote.setScents(createdScents);
      await createdScents[0].setFeels(createdFeels);
      done();
    } catch (e) {
      done(e);
    }
  });




  it('findOne should be success.', async (done) => {
    try {
      let perfumeName = '香水配方名';
      let {id} = createdScentNote

      let findScentNote = await ScentNote.findOne({
        where: {id},
        include: [{
          model: Scent,
          include: Feel
        }]
      });
      let findScents = findScentNote.toJSON().Scents
      let findFeels = findScents[0].Feels;


      (findScents.length == 3).should.be.true;
      (findFeels.length == 2).should.be.true;
      console.log("ScentNote: ", JSON.stringify(findScentNote.toJSON(), null, 2));

      done();
    } catch (e) {
      done(e);
    }
  });

});
