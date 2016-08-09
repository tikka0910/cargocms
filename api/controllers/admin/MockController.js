import MockData from 'mockup-data';
module.exports = {
  index: async (req, res) => {
    res.ok({view: true});
  },
  find: async (req, res) => {
    console.log("=== mock find ===");
    try {
      let params = sails.config.mock.config;
      let count = sails.config.mock.count;
      let mockData = new MockData({params, count});
      mockData.processRandamData();
      let items = mockData.getData();
      let {cols} = params

      res.ok({view: true, data: {items, cols}});

    } catch (e) {

      res.serverError(e);

    }
  },
  create: async (req, res) => {
    res.ok({view: true});
  },
  edit: async (req, res) => {
    res.ok({view: true});
  },
  show: async (req, res) => {
    res.ok({view: true});
  },
}
