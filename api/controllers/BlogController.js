module.exports = {
  index: async (req, res) => {
    try {
      res.view('blog/index', {
        
      });
    } catch (e) {
      res.serverError(e);
    }
  },
}
