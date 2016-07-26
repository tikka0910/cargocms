import FB from 'fb'

// export default (userid, token, cb) => {
//   FB.setAccessToken(token);
//   return FB.api(userid + '/friends', function(res) {
//     return cb(null, res.data);
//   });
// };

export default class FacebookHelper {

  constructor({token, identifier}) {
    this.FB = FB;
    this.FB.setAccessToken(token);
    this.identifier = identifier;
  }

  async getProfileWithLocale({locale}) {
    try {
      let result = await new Promise((resolve, reject) => {
        this.FB.api(`${this.identifier}?fields=id,name,last_name,first_name&locale=${locale}`, function(res, error) {
          if(error) reject(error);
          resolve(res);
        });
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getFriends() {
    try {
      let result = await new Promise((resolve, reject) => {
        this.FB.api(`${this.identifier}/friends`, function(res, error) {
          if(error) reject(error);
          resolve(res.data);
        });
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async publishPost({message}) {
    try {
      let result = await new Promise((resolve, reject) => {
        this.FB.api(`${this.identifier}/feed`, 'post', { message }, function(res, error) {
          if(error) reject(error);
          resolve(res);
        });
      });
      return result;

    } catch (e) {
      throw e;
    }
  }

}
