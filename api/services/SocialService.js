module.exports = {


  forRecipe: ({recipes}) => {
    try {
      let socialsConfig = sails.config.socials

      const socialData = recipes.map((recipe) => {
        const {id, description} = recipe;
        const title = recipe.perfumeName;
        const url = "http://" + sails.config.domainName + '/recipe/' + id
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
        const url = "http://" + sails.config.domainName + '/blog/show/' + id
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
