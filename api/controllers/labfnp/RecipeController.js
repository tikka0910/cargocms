
module.exports = {
  show: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const recipe = await Recipe.findOneAndIncludeUserLike({
        findByRecipeId: id,
        currentUser
      });
      if (!recipe) {
        return res.notFound();
      }
      return res.view({ recipe });
    } catch (e) {
      console.log(e);
      return res.serverError(e);
    }
  },
  edit: async function(req, res) {
    const { id } = req.params;
  }
}
