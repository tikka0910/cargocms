module.exports = {
  create: async (datas = []) => {
    try {
      const tags = [];
      for (let data of datas) {
        const findOrCreate = await Tag.findOrCreate({
          where: { title: data.title },
          defaults: data,
        });
        tags.push(findOrCreate[0]);
      }
      return tags.map(tag => tag.id);
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  addToPost: async({postId, tags}) => {
    try {
      console.log(tags);
      const post = await Post.findById(postId);
      const result = await post.addTags(tags);
      return result;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  updatePostTag: async({postId, tags}) => {
    try {
      const post = await Post.findById(postId);
      let originTags = await post.getTags();
      originTags = originTags.map(tag => tag.id);
      await post.removeTags(originTags);
      let newTags = await post.addTags(tags);
      return newTags[0].map(tag => tag.toJSON());
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },
}
