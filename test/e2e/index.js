
require("../bootstrap.test.js")
describe('main page test', () => {
  describe('get index title', () => {
    it('should be get broser title of LFP @watch', () => {
      browser.url('http://localhost:1338/');
      expect(browser.getTitle()).to.equal('LFP: 香料香水實驗室，客製專屬香水');
    });
  });
});
