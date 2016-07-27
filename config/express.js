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
  }
};