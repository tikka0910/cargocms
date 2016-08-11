module.exports = {
  create: async function ({ title,  content,  cover = null, coverType, coverUrl, url,  abstract, UserId }) {
    try {
      return await Post.create({
        title,
        content,
        cover: cover === '' ? null : cover,
        coverType,
        coverUrl,
        url,
        abstract,
        UserId,
      });
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  update: async function (postId, { title,  content,  cover, coverType, coverUrl, url,  abstract, TagsArray }) {
    try {
      await Post.update({
        title,
        content,
        cover: cover === '' ? null : cover,
        coverType,
        coverUrl,
        url,
        abstract
      }, {
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
