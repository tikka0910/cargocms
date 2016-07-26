import FacebookHelper from './libraries/facebook/'

module.exports = {
  getProfileWithLocale: async ({query, locale}) => {
    try {
      let token = query.tokens.accessToken;
      let identifier = query.identifier;
      let facebookHelper = new FacebookHelper({identifier, token});
      let result = await facebookHelper.getProfileWithLocale({locale});
      return result;
    } catch (e) {
      throw e;
    }
  }
}
