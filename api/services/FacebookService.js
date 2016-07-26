import FacebookHelper from './libraries/facebook/'

module.exports = {
  getProfileWithLocale: async ({token, identifier, locale}) => {
    try {
      let facebookHelper = new FacebookHelper({identifier, token});
      let result = await facebookHelper.getProfileWithLocale({locale});
      return result;
    } catch (e) {
      throw e;
    }
  }
}
