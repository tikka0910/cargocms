var feelingData = require("./feeling.json");

describe.only('import data.', () => {
  /*
  {
    "Scent":"BU2",
    "cfeeling":"木質",
    "totalrepeat":18,
    "score":6,
    "color":"#B35721"
  },
  */


  it('import feeling', async (done) => {
    console.log(feelingData.length);

    try {
      for (let feelingRow of feelingData) {

        let newScentNote = {
            color: feelingRow.color,
            title: feelingRow.color
        }

        let newScent = {
          name: feelingRow.Scent
        }
        let newFeeling = {
            title: feelingRow.cfeeling
        }

        let scentNote = (await ScentNote.findOrCreate({
          where: {color: newScentNote.color},
          defaults: newScentNote
        }))[0];


        let scent = (await Scent.findOrCreate({
          where: {name: newScent.name},
          defaults: newScent
        }))[0];

        let feeling = (await Feeling.findOrCreate({
          where: {title: newFeeling.title},
          defaults: newFeeling
        }))[0];

        await scentNote.addScent(scent)
        await scent.addFeeling(feeling);
      }
      done();

    } catch (e) {
      done(e);
    }

  });

});
