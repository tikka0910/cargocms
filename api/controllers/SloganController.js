module.exports = {

  findOne: async (req, res) => {
    const sloganId = req.params.id;
    try{
      const slogan = await Slogan.findById(sloganId);
      sails.log.info('get Slogan =>', slogan);
      res.ok({
        message: 'Get slogan success',
        data: slogan
      });
    }
    catch(e){
      res.serverError({
        meaasge: e.message,
        data: {}
      });
    }
  }
  
}
