
describe("about Mailer service", () => {
  let order = {
    serialNumber: 'test',
    User: {
      username: 'testUser',
      email: 'smlsun@gmail.com'
    }
  }

  it('send paymentConfirm', async (done) => {

    try {
      let messageConfig = await MessageService.paymentConfirm(order);
      let message = await Message.create(messageConfig);
      console.log("!!!!!", message.toJSON());
      await MessageService.sendMail(message);
      done();
    } catch (e) {
      done(e);
    }

  });

  it.only('send orderConfirm', async (done) => {

    try {
      let messageConfig = await MessageService.orderConfirm({
        productName: 'productName!!!!',
        serialNumber: 'serialNumber!!!!',
        email: 'email!!!!',
        username: 'username!!!!',
        bankId: 'bankId!!!!',
        bankName: 'bankName!!!!',
        bankName: 'bankName!!!!',
        accountId: 'accountId!!!!',
        accountName: 'accountName!!!!',
        paymentTotalAmount: 'paymentTotalAmount!!!!',
        shipmentUsername: 'shipmentUsername!!!!',
        shipmentAddress: 'shipmentAddress!!!!',
      });
      let message = await Message.create(messageConfig);
      console.log("!!!!!", message.toJSON());
      await MessageService.sendMail(message);
      done();
    } catch (e) {
      done(e);
    }

  });

  it('send deliveryConfirm', async (done) => {

    try {
      await MessageService.deliveryConfirm(order);
      done();
    } catch (e) {
      done(e);
    }

  });

});
