module.exports = {
  upload: async(req, res) => {
    try {
      sails.log.info(req.body);
      let promise = new Promise((resolve, reject) => {
      req.file('uploadPic').upload(async(err, files) => {
        resolve(files);
      });
    });
    let files = await promise.then();
    res.ok({
      message: 'Upload Success',
      data: files,
    });
    } catch (e) {
      res.serverError({
        // error 是 FineUploader 的格式
        error: e.message,
        message: e.message,
        data: {}
      });
    }
  },
}
