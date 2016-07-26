module.exports = {
  index: function(req, res) {
    let user = AuthService.getSessionUser(req);
    // in jade use `#{data.user} to access`
    return res.ok({user})
  }
}
