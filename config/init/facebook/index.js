var FB = require("fb");

module.exports.init = async () => {
  try {

    console.log('>>>> config/init/facebook >>>>');

    FB.setAccessToken(sails.config.facebook.accessToken);

    FB.api(
        "/"+sails.config.facebook.pageId+"/feed?fields=full_picture,name,message,story,description,type,link", //?fields=full_picture,name,message,story,description,type
        function (response) {
          // console.log(response);
          if (response && !response.error) {
            response.data.forEach(function(feed){
              Feed.create({
                fullPicture: feed.full_picture,
                name: feed.name,
                message: feed.message,
                story: feed.story,
                description: feed.description,
                type: feed.type,
                link: feed.link,
                createdAt: feed.created_time,
                sourceId: feed.id,
              });
            });
          }
        }
    );

  } catch (e) {
    console.error(e);
  }
};
