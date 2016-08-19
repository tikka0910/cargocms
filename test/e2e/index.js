require("../bootstrap.test.js")
import {login} from "../bootstrap.e2e.js"
login("admin");

describe('test logout', () => {
	it('logout @watch', () => {
		browser.click('#logout-link');
		browser.element('#logout-link').state.should.be.equal('failure');
	});
});
