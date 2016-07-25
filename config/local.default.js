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
        clientID: '144219216008720',
        clientSecret: '3a76f7e46520643c445e6360ecc9e221',
        callbackURL: "http://localhost:5001/auth/facebook/callback",
        profileFields: [
          'id', 'email', 'gender', 'link', 'locale',
          'name', 'timezone', 'updated_time', 'verified',
          'displayName', 'photos'
        ]
      }
    }
  },
  session: {
    secret: '',
  }
}
