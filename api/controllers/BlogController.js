module.exports = {
  index: async (req, res) => {
    try {

      res.view('blog/index', {
        message: 'blog index',
        data: {
          items: await Post.findAll({ include: Tag }),
        }
      });
    } catch (e) {
      res.serverError(e);
    }
  },
}
