// { draw: '1',
//   columns:
//    [ { data: 'id', name: '' },
//      { data: 'username', name: '' },
//      { data: 'displayName', name: '' },
//      { data: 'email', name: '' },
//      { data: 'lastLogin', name: '' },
//      { data: '5', name: '' } ],
//   order: [ { column: '2', dir: 'asc' } ],
//   start: '0',
//   length: '10',
//   search: { value: 'userX', regex: 'false' },
//   _: '1470989140227'
// }

module.exports = {
  getQueryObj: (input) => {
    try {
      sails.log.debug(data);
      let data = {
        where: {},
      };
      data.where.$or = input.columns.map((column) => {
        let data = {};
        data[column.data] = {
          $like: `%${input.search.value}%`
        }
        sails.log.info(data);
        return data;
      });
      data.offset = input.start;
      data.limit = input.length;
      data.order = input.order.map((data) => {
        let columnIndex = data.column;
        let sortColumn = input.columns[columnIndex].data;
        return [sortColumn, data.dir];
      });
      return data;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },
}
