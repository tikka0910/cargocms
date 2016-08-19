module.exports = {
  create: async (req, res) => {
    const data = req.body;
    try{
      sails.log.info('create slogan controller =>', data);
      const slogan = await Slogan.create(data);
      res.ok({
        message: 'Created Slogan success.',
        data: slogan,
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  find: async (req, res) => {
    try{
      let {query} = req
      let {serverSidePaging} = query
      let modelName = req.options.controller.split("/").reverse()[0]
      let result;
      if(serverSidePaging){
        result = await PagingService.process({query, modelName});
      }else {
        const items = await sails.models[modelName].findAll();
        result = {data: {items}}
      }
      // const items = await Slogan.findAll();
      // const result = {data: {items}}
      // sails.log.info('find all slogan =>', result);
      // sails.log.info('slogan =>', result.data.items[0].content);
      res.ok(result);
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  findOne: async (req, res) => {
    try{
      const id = req.params.id;
      const slogan = await Slogan.findById(id);
      sails.log.info('find one slogan =>', slogan);
      res.ok({
        message: 'Get one slogan success.',
        data: slogan
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  update: async (req, res) => {
    try{
      const id = req.params.id;
      const newData = req.body;

      sails.log.info('update slogan controller id =>', id);
      sails.log.info('update slogan controller data =>', newData);
      const slogan = await Slogan.findById(id);
      slogan.content = newData.content;
      slogan.source  = newData.source;
      await slogan.save();

      res.ok({
        message: 'Update slogan success.',
        data: slogan
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  destroy: async (req, res) => {
    const id = req.params.id;
    try{
      sails.log.info('delete slogan controller =>',id);
      const slogan = await Slogan.destroy({where:{ id: id}});

      res.ok({
        message: 'Delete slogan success.',
        data: slogan
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  }
}
