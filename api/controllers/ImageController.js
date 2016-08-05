module.exports = {
  upload: async(req, res) => {
    try {
      sails.log.info(req.body);
      let promise = new Promise((resolve, reject) => {
      req.file("uploadfile").upload(async(err, files) => {
        resolve(files);
      });
    });

    let files = await promise.then();
    sails.log.info(files);
    res.ok();
    } catch (e) {
      res.serverError(e);
    }
  },
}
