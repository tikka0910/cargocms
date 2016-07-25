const feed = require('./feed.js');

module.exports = {
  index: async (req, res) => {
    try {
      res.view('wall/index', {
        feed
      });
    } catch (e) {
      res.serverError(e);
    }
  },
}
