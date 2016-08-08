module.exports = {
  create: async ({ title,  content,  cover,  url,  abstract }) => {
    try {
      return await Post.create({ title, content, cover, url, abstract });
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  update: async (postId, { title,  content,  cover,  url,  abstract, TagsArray }) => {
    try {
      await Post.update({ title,  content,  cover,  url,  abstract }, {
        where: {
          id: postId,
        }
      });
      await TagService.updateOrCreate({
        postId,
        datas: TagsArray
      });
      return true;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },
}
