

module.exports = {
  login: (user) => {
    try {
      console.log("=== before start ===");
      browser.windowHandleSize({width:1280,height:900}).url('/');
      expect(browser.getTitle()).to.equal('LFP: 香料香水實驗室，客製專屬香水');
      browser.click('#login');
      browser.setValue('#identifier', user)
      browser.setValue('#password', user)
      browser.click('#submit-button');
      browser.element('#logout-link').state.should.be.equal('success');
      console.log("=== before end ===");

    } catch (e) {
      throw e;
    }
  }
}
