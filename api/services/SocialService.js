module.exports = {
  getData: ({model, url, socials}) => {
    try {
      let result = []

      Object.keys(socials).reduce((result, key) => {

        if(socials[key]){
          let data = {};
          data.url = url + model.id
          data.target = key

          result.push(data);
        }

        return result;
      }, result)

      return result;

    } catch (e) {
      throw e;
    }
  },

  getAllData: ({url, models, socials}) => {
    try {
      let result = models.map((model) => {
        return SocialService.getData({model, url, socials});
      })

      return result;
    } catch (e) {
      throw e;
    }
  }
}
