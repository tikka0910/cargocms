module.exports = {
  attributes: {
    invoiceNo: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    tradeNo: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    invoiceNoCheck: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    tradeNoCheck: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    feeling: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  associations: function() {
    RecipeFeedback.belongsTo(User);
    RecipeFeedback.belongsTo(Recipe);
  },
  options: {
    classMethods: {
    }
  }
};
