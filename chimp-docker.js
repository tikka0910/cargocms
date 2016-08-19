// default config: https://github.com/xolvio/chimp/blob/master/src/bin/default.js
var ip = require("ip");
var host = ip.address();

module.exports = {
  port: 4444,
  host: "localhost",
  browser: 'firefox',
  webdriverio: {
    baseUrl: 'http://'+host+':1338'
  },
};
