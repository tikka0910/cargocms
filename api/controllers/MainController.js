module.exports = {
  index: function(req, res) {
    let user = AuthService.getLoginUser(req);
    // in jade use `#{data.user} to access`
    return res.ok({user})
  }
}
