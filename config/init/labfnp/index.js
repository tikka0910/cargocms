var fs = require('fs');

var ScentNoteData = require('./data/ScentNote')

module.exports.init = async () => {
  try {


    ScentNoteData.rows.forEach(function(row) {
      ScentNote.create(row);
    });

  } catch (e) {
    console.error(e);
  }
};
