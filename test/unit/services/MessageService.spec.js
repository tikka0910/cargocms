
describe("about Mailer service", () => {
  let order = {
    serialNumber: 'test',
    User: {
      username: 'testUser',
      email: 'smlsun@gmail.com'
    }
  }

  it.only('send paymentConfirm', async (done) => {

    try {
      let messageConfig = await MessageService.paymentConfirm(order);
      let message = await Message.create(messageConfig);
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
