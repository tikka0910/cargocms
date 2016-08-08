/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
const url = require('url');

module.exports = {

  index: function(req, res) {
    res.view({}, "admin/index");
  },

  debug: function(req, res) {
    res.ok({a: 3});
  },

  config: function(req, res) {
    let config = {
      title: 'CargoCMS 雲端管理系統',
      copyright: '© Laboratory of Fragrance &amp; Perfume',
    };

    res.set('Content-Type', 'text/javascript');
    res.send(new Buffer('var __ADMIN_CONFIG__='+JSON.stringify(config)+';'));
  },

};
