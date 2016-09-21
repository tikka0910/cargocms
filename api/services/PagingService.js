import FacebookHelper from './libraries/facebook/'

module.exports = {
  process: async ({query, modelName, include}) => {
    try {
      const findQuery = FormatService.getQueryObj(query);
      if (include){
        findQuery.include = include;
      }
      let result = await sails.models[modelName].findAndCountAll(findQuery)
      sails.log.debug(JSON.stringify(result, null, 2));
      let data = result.rows;
      let recordsTotal = data.length
      let recordsFiltered =  result.count
      let draw = parseInt(query.draw) + 1
      return {draw, recordsTotal, recordsFiltered, data};
    } catch (e) {
      throw e;
    }
  }
}
