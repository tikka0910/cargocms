module.exports = {

  isAuthenticated: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getSessionUser: function(req) {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    } else {
      return null;
    }
  }

}
