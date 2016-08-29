
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
      let messageConfig = await CustomMailerService.paymentConfirm(order);
      let message = await Message.create(messageConfig);
      await CustomMailerService.sendMail(message);
      done();
    } catch (e) {
      done(e);
    }

  });

  it('send deliveryConfirm', async (done) => {

    try {
      await CustomMailerService.deliveryConfirm(order);
      done();
    } catch (e) {
      done(e);
    }

  });

});
