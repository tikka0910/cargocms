module.exports = {
  getShareUrl: function() {
    const url = "http://" + sails.config.shareUrl
    return url;
  },


  forRecipe: ({recipes}) => {
    try {
      let socialsConfig = sails.config.socials

      const socialData = recipes.map((recipe) => {
        const {hashId, description} = recipe;
        const title = recipe.perfumeName;
        const url = SocialService.getShareUrl() + '/recipe/' + hashId
        return {
          description, title, url
        }
      });

      let social = {
        data: socialData,
        targets: socialsConfig
      };
      return social;
    } catch (e) {
      throw e;
    }
  },

  forPost: ({posts}) => {
    try {
      let socialsConfig = sails.config.socials

      const socialData = posts.map((post) => {
        const {id, title} = post;
        const description = "";
        const url = SocialService.getShareUrl() + '/blog/show/' + id
        return {
          description, title, url
        }
      });

      let social = {
        data: socialData,
        targets: socialsConfig
      };
      return social;
    } catch (e) {
      throw e;
    }
  }

}
