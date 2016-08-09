import MockData from 'mockup-data';
module.exports = {
  index: async (req, res) => {
    res.ok({view: true});
  },
  find: async (req, res) => {
    console.log("=== mock find ===");
    try {
      let params = {
        cols: [
          { key: 'seq', name: '項次', type: 'sequence' },
          { key: 'user', name: '員工帳號', type: 'number', format: '######' },
          { key: 'name', name: '姓名', type: 'name', lang: 'zh' },
          { key: 'type', name: '測驗類別', type: 'static', text: '1-16冊' },
          { key: 'subject', name: '測驗科目', type: 'static', text: 'Unit01' },
          { key: 'progress', name: '測驗進度', type: 'random_pick', source: ['第 1 部分', '第 2 部分', '第 3 部分', 'Finish'] },
          { key: 'none', name: '非申請分數', type: 'random_num', min: 10, max: 100 },
          { key: 'done_time', name: '測驗完成時間', type: 'random_num', min: 5, max: 20, interval: 5 },
          { key: 'check', name: '批閱', type: 'static', text: '-' },
          { key: 'exma_date', name: '測驗日期', type: 'date', start: '2016-07-08', end: '2016-08-10' },
          { key: 'exma_status', name: '測驗狀態', type: 'random_pick', source: ['已完成', '未完成'] },
          { key: 'exma_type', name: '測驗形式', type: 'random_pick', source: ['電腦測驗', '紙本測驗'] },
          { key: 'report', name: '報表', type: 'icon', className: 'fa fa-print' },
        ]
      }
      let count = 1000;
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
