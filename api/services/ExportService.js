module.exports = {
  export: async ({query, modelName}) => {
    try {
      let findQuery = FormatService.getQueryObj(query);
      findQuery.where.createdAt = {};
      if (query.startDate !== '') {
        findQuery.where.createdAt.$gte = new Date(query.startDate);
      }
      if (query.endDate !== '') {
        findQuery.where.createdAt.$lte = new Date(query.endDate);
      }
      delete findQuery.offset;
      delete findQuery.limit;
      sails.log.info(findQuery);
      const result =  await sails.models[modelName].findAll(findQuery);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
