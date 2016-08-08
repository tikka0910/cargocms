var express = require('express');

module.exports.express = {
  middleware: {
    custom: true
  },
  customMiddleware: function (app) {
    // console.log("######### HELLO ######");
    // app.use(express.logger());
    // app.use(express.compress());
    // app.use('/admin', express.static('admin/web/'));

    console.log('### Setting: plugable assets');
    app.use('/assets', express.static('assets-labfnp'));
    app.use('/assets/labfnp', express.static('assets-labfnp'));
    app.use('/assets/unify', express.static('assets-unify'));
    app.use('/assets/admin', express.static('assets-admin'));
  }
};