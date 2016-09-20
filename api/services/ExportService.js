import stringify from 'csv-stringify';
import moment from 'moment';
import fs from 'fs';
import iconv from 'iconv-lite';

module.exports = {
  query: async ({query, modelName, include}) => {
    try {
      let findQuery = FormatService.getQueryObj(query);
      if (include) {
        findQuery.include = include;
      }
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
  },

  export: async ({json, fileName}) => {
    try {

      sails.log.debug(json);
      const dataString = await new Promise((defer, reject) => {
        stringify(json, function(err, output){
          if (err) reject(err);
          defer(output);
        });
      });
      sails.log.debug(dataString);

      const encoding = 'big5';
      let dataBuffer = new Buffer(dataString);
      dataBuffer = iconv.encode(dataBuffer, encoding);
      const now = moment(new Date()).format("YYYYMMDDHHmmSS");
      fileName = `${fileName || ''}-${now}.csv`;

      const filePath = `${__dirname}/../../.tmp/${fileName}`;
      // await fs.writeFileSync(filePath, dataBuffer);

      return { filePath, fileName, data: dataBuffer};
    } catch (e) {
      throw e;
    }
  }
}
