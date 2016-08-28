module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.findAllHasJoin('DESC');
      const social = SocialService.forPost({posts});
      const items = posts;
      const data = {items}
      res.view('blog/index', {data, social});
    } catch (e) {
      res.serverError(e);
    }
  },
  show: async (req, res) => {
    try {
      let data = await Post.findByIdHasJoin(req.params.id);
      const social = SocialService.forPost({posts: [data]});
      res.view('blog/show', {data, social});
    } catch (e) {
      res.serverError(e);
    }
  },
}
