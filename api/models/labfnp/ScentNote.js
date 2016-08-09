module.exports = {
  attributes: {
    color: {
      type: Sequelize.STRING
    },
    title: {
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
    classMethods: {
      findAllWithRelation: async function(){
        let findScentNotes = await ScentNote.findAll({
          include: [{
            model: Scent,
            include: Feel
          }]
        });
        return findScentNotes;
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
