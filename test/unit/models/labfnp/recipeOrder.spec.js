describe('test Recipe Order model operation', function() {
  describe("find With Like User", () => {
    let recipeOrderTest, testUser;
    before(async (done) => {
      try {
        testUser = await User.create({
          username: 'testOrderUser',
          email: 'testOrderUser@gmail.com',
          password: ''
        });

        recipeOrderTest = await Recipe.create({
          formula:[
            {"drops":"1","scent":"BA69","color":"#E87728"},
            {"drops":"2","scent":"BA70","color":"#B35721"}
          ],
          formulaLogs: '',
          authorName: '王大明',
          perfumeName: 'love test',
          message: 'this is love test',
          UserId: testUser.id,
        });

        done()

      } catch (e) {
        done(e)
      }
    })


    it.only('create order', async (done) => {
      try {
        let recipeOrder = await RecipeOrder.create({
          remark: '123',
        });

        await recipeOrder.setUser(testUser.id);
        await RecipeOrderItem.addRecipe({
          RecipeId: recipeOrderTest.id,
          RecipeOrderId: recipeOrder.id,
        });
        await RecipeOrderItem.addRecipe({
          RecipeId: recipeOrderTest.id,
          RecipeOrderId: recipeOrder.id,
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
