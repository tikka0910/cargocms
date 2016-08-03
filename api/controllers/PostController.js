module.exports = {
  index: async (req, res) => {
    try {
      res.ok({
        message: 'Create post success.',
        data: {
          items: await Post.findAll({ include: Tag }),
        }
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  create: async (req, res) => {
    try {
      const { post, tags} = req.body
      let newPost = await PostService.create(post);
      await TagService.updateOrCreate({
        postId: newPost.id,
        datas: tags
      })
      res.ok({
        message: 'Create post success.',
        data: newPost,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  findOne: async (req, res) => {
    try {
      const { postId } = req.params;
      res.ok({
        message: 'find post success.',
        data: await Post.findByIdHasJoin(postId),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  update: async (req, res) => {
    try {
      const { postId } = req.params;
      res.ok({
        message: 'update post success.',
        data: await PostService.update(postId, req.body),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  delete: async (req, res) => {
    try {
      const { postId } = req.params;
      res.ok({
        message: 'delete post success.',
        data: await Post.deleteById(postId ),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  }
}
