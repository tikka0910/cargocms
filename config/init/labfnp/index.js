var fs = require('fs');

var ScentNoteData = require('./data/ScentNote')
var ScentData = require('./data/Scent')


module.exports.init = async () => {
  try {


    ScentNoteData.rows.forEach(function(row) {
      ScentNote.create(row);
    }).then(function(scentNote) {

      ScentData.rows.forEach(function(row) {
        if (row.scentNote == scentNote.title) {
          row.scents.forEach(function(scentName) {
            Scent.create({ name: scentName }).then(function(it) {console.log(it);});
          })
        }
      });

    });

  } catch (e) {
    console.error(e);
  }
};
