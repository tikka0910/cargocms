var FB = require("fb");

module.exports.init = async () => {
  try {

    console.log('>>>> config/init/facebook >>>>');

    if (!sails.config.facebook || !sails.config.facebook.accessToken) {
      console.log('<<< error: config/init/facebook => facebook.accessToken config undefined');
      return;
    }

    FB.setAccessToken(sails.config.facebook.accessToken);

    const feedUrl = "/"+sails.config.facebook.pageId+"/feed?limit=100&fields=full_picture,name,message,story,description,type,link";
    //?fields=full_picture,name,message,story,description,type

    console.log('Feed URL: ' + feedUrl);

    FB.api(feedUrl, async (response) => {
        // console.log(response);
        if (response && !response.error) {

          console.log('Found: ' + response.data.length);

          for (var feed of response.data) {

            let row = {
              fullPicture: feed.full_picture,
              name: feed.name,
              message: feed.message,
              story: feed.story,
              description: feed.description,
              type: feed.type,
              link: feed.link,
              createdAt: feed.created_time,
            };

            await Feed.findOrCreate({ where: {sourceId: feed.id}, defaults: row });
          }
        }
      }
    );

    console.log('<<< done: config/init/facebook <<<');

  } catch (e) {
    console.error(e);
  }
};
