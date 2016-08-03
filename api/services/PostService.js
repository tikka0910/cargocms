module.exports = {
  create: async (data = {
    title,
    content,
    cover,
    url,
    abstract,
  }) => {
    try {
      return await Post.create(data);
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  update: async (postId, data = {
    title,
    content,
    cover,
    url,
    abstract,
  }) => {
    try {
      return await Post.update(data, {
        where: {
          id: postId,
        }
      });
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },
}
