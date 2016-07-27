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

  findById: async ({ id }) => {
    try {
      return await Post.findOne({
        where: { id },
        include: Tag
      });
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

  destroy: async ({ id }) => {
    try {
      return await Post.destroy({ where: { id } });
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  }
}
