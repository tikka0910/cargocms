module.exports = {
  attributes: {
    // 歐付寶
    // 欄位名稱統一使用歐付寶回傳資料，所以不符合其他命名規則
    // 訂單編號，提供給 allpay 使用
    // 訂單成立後更新的編號，由 allpay 提供
    TradeNo: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    MerchantTradeNo: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    // allpay 回傳資訊
    RtnCode: {
      type: Sequelize.INTEGER(2),
    },
    // allpay 回傳資訊
    RtnMsg: {
      type: Sequelize.STRING(200),
    },
    // allpay 付款時間
    PaymentDate: {
      type: Sequelize.DATE,
    },
    // allpay 交易日期
    TradeDate: {
      type: Sequelize.DATE,
    },
    // allpay 採用金流方式
    PaymentType: {
      type: Sequelize.STRING(20),
    },
    // allpay 應該要收到的付款金額
    ShouldTradeAmt: {
      type: Sequelize.FLOAT,
    },
    // allpay 付款金額
    TradeAmt: {
      type: Sequelize.FLOAT,
    },
    // allpay bankcode
    BankCode: {
      type: Sequelize.STRING(3),
    },
    // 要繳費的帳號
    vAccount: {
      type: Sequelize.STRING(16),
    },
    // 過期日期
    ExpireDate: {
      type: Sequelize.STRING(20),
    },
    // 支付交易編號
    PaymentNo: {
      type: Sequelize.STRING(14),
    },
    // allpay 交易，用於 ibon, barcode 付帳流程上
    Barcode1: {
      type: Sequelize.STRING(20),
    },
    Barcode2: {
      type: Sequelize.STRING(20),
    },
    Barcode3: {
      type: Sequelize.STRING(20),
    },
    // allpay 金額產生使用
    CheckMacValue: {
      type: Sequelize.STRING,
    },
    // 訂單產生的時候的交易時間
    MerchantTradeDate: {
      type: Sequelize.DATE,
    },
  },
  associations: function() {
    Allpay.belongsTo(Recipe);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
