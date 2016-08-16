import FacebookHelper from './libraries/facebook/'

module.exports = {
  process: async ({query, modelName}) => {
    try {
      const findQuery = FormatService.getQueryObj(query);
      let result = await sails.models[modelName].findAndCountAll(findQuery)
      let data = result.rows
      let recordsTotal = data.length
      let recordsFiltered =  result.count
      let draw = parseInt(query.draw) + 1
      return {draw, recordsTotal, recordsFiltered, data};
    } catch (e) {
      throw e;
    }
  }
}
