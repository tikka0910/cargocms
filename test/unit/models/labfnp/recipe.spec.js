describe('test Recipe model operation', function() {

  it('create should be success.', async (done) => {
    try {
      let newLabfnpRecipe = {
        formula: [ 'B5:3', 'T14:3' ],
        formulaLogs: "+B4:3;+T14:2;-B4:3",
        authorName: '作者名',
        perfumeName: '香水配方名'
      }

      let createdLabfnpRecipe = await Recipe.create(newLabfnpRecipe);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('findOne should be success.', async (done) => {
    try {
      let perfumeName = '香水配方名';
      let createdLabfnpRecipe = await Recipe.findOne({where: {perfumeName}});
      console.log(createdLabfnpRecipe.toJSON());

      done();
    } catch (e) {
      done(e);
    }
  });

  describe.only("find With Like User", () => {
    let recipeLoveTest, testUser, likeUser;
    before(async (done) => {
      try {
        testUser = await User.create({
          username: 'testUser',
          email: 'testUser@gmail.com',
          password: ''
        });

        console.log("testUser id:", testUser.id);

        likeUser = await User.create({
          username: 'likeUser',
          email: 'likeUser@gmail.com',
          password: ''
        });
        console.log("likeUser id:", likeUser.id);
        let newRecipeLoveTest = {
          formula:[
            {"drops":"1","scent":"BA69","color":"#E87728"},
            {"drops":"2","scent":"BA70","color":"#B35721"}
          ],
          formulaLogs: '',
          authorName: '王大明',
          perfumeName: 'love test',
          message: 'this is love test',
          UserId: testUser.id,
        };

        recipeLoveTest = await Recipe.create(newRecipeLoveTest);


        await likeUser.addRecipes(recipeLoveTest, {as: 'LikeRecipes'})
        done()

      } catch (e) {
        done(e)
      }
    })
    it('should be success.', async (done) => {
      try {
        let user = likeUser;
        let result = await Recipe.findAndIncludeUserLike({user});
        console.log(JSON.stringify(result, null, 2));
        done();
      } catch (e) {
        done(e);
      }
    });

  })



});
