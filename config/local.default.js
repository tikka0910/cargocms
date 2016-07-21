module.exports = {
  passport: {
    local: {
      strategy: require('passport-local').Strategy
    },
    facebook: {
      name: 'Facebook',
      protocol: 'oauth2',
      strategy: require('passport-facebook').Strategy,
      options: {
        clientID: '',
        clientSecret: '',
        profileFields: ['id', 'displayName', 'photos', 'email']
      }
    }
  },
  session: {
    secret: '',
  }
}
