

/*
// Sample data
{
  notes: 'FLORAL',
  color: '',
  keywords: '',
  title: 'Fruity',
  title2: '果香調',
  description: ''
}
*/

module.exports = {
  attributes: {
    notes: {
      type: Sequelize.ENUM('FLORAL', 'ORIENTAL', 'WOODY', 'FRESH')
    },
    color: {
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    title2: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    ScentNote.hasMany(Scent, {
      foreignKey: {
        name: 'ScentNoteId'
      }
    });
  },
  options: {
    timestamps: false,
    classMethods: {
      findAllWithRelation: async function(){
        let findScentNotes = await ScentNote.findAll({
          include: [{
            model: Scent,
            include: Feeling
          }]
        });
        return findScentNotes;
      },
      importFeelingFromFile: async function({path}){
        
        
        /**
         * Deprecated! 這個已經被標準匯入資料的功能給取代
         */
        
        
        // var feelingData = require(path);
        // try {
        //   sails.log.info(feelingData.length);
        //   for (let feelingRow of feelingData) {

        //     let newScentNote = {
        //         color: feelingRow.color,
        //         title: feelingRow.color
        //     }

        //     let newScent = {
        //       name: feelingRow.Scent
        //     }
        //     let newFeeling = {
        //         title: feelingRow.cfeeling
        //     }

        //     let scentNote = (await ScentNote.findOrCreate({
        //       where: {color: newScentNote.color},
        //       defaults: newScentNote
        //     }))[0];


        //     let scent = (await Scent.findOrCreate({
        //       where: {name: newScent.name},
        //       defaults: newScent
        //     }))[0];

        //     // let feeling = (await Feeling.findOrCreate({
        //     //   where: {title: newFeeling.title},
        //     //   defaults: newFeeling
        //     // }))[0];

        //     await scentNote.addScent(scent);
        //     //await scent.addFeeling(feeling);
        //   }

        // } catch (e) {
        //   throw e;
        // }


      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
