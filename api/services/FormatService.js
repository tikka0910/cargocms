module.exports = {
  getQueryObj: (input) => {
    try {
      sails.log.debug(JSON.stringify(input, null, 2));
      let data = {
        where: {},
      };
      data.where.$or = [];
      for (const index in input.columns) {
        let result = {};
        const column = input.columns[index];
        if (column.searchable !== "false") {
          result[column.data] = {
            $like: `%${input.search.value}%`
          };
          data.where.$or.push(result);
          if (column.search && column.search.value !== '') {
            data.where[column.data] = {
              $like: `%${column.search.value}%`
            };
          }
        }
      }
      const hasDateFilter = input.startDate !== '' || input.endDate !== '';
      if (hasDateFilter) {
        data.where.createdAt = {};
        if (input.startDate !== '') {
          data.where.createdAt.$gte = new Date(input.startDate);
        }
        if (input.endDate !== '') {
          data.where.createdAt.$lte = new Date(input.endDate);
        }
      }
      data.offset = parseInt(input.start);
      data.limit = parseInt(input.length);
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
