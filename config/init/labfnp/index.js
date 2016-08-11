
const ScentNoteData = require('./data/ScentNote');
const ScentData = require('./data/Scent');
const FeelingData = require('./data/Feeling');

module.exports.init = async () => {
  try {


    ScentNoteData.rows.forEach(function(row) {
      ScentNote.create(row).then(function(scentNote) {

        ScentData.rows.forEach(function(row) {
          if (row.scentNote == scentNote.title) {
            row.scents.forEach(function(scentName) {

              Scent.create({
                sequence: parseInt(scentName.replace(/[^0-9]+/, '')),
                name: scentName,
                feelings: FeelingData[scentName] || []
              })
              .then(function(scent) {
                scentNote.addScent(scent);
                console.log(JSON.stringify(scent));
              });

            })
          }
        });

      });
    });

  } catch (e) {
    console.error(e);
  }
};
