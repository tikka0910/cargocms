describe.only('test Feeling model operation', function() {
  before(async (done) =>{
    try {

      await Feeling.bulkCreate([
        {title: '感覺棒'}, {title: '感覺棒'}, {title: '感覺棒'},
        {title: '感覺棒棒'}, {title: '感覺棒棒'},
        {title: '感覺棒棒棒'}
      ])

      done()
    } catch (e) {
      done(e)
    }

  })
  it('get distinct data.', async (done) => {
    try {
      let result = await Feeling.findDistinctFeelings();
      console.log(JSON.stringify(result, null, 2));

      result.length.should.be.equals(3);


      done();
    } catch (e) {
      done(e);
    }

    // 透過 group 來進行 distinct

    // select title
    // from `Feelings`
    // where title = '木質'
    // GROUP BY title;

    // 進階 可以再計算對應資料

    // select title, count(title) as repeatVal, sum(score) as scoreVal
    // from `Feelings`
    // GROUP BY title
    // order by repeatVal desc, scoreVal desc
    // ;
  });

  it('get random distinct data.', async (done) => {
    try {
      let result = await Feeling.findRamdomFeelings();
      console.log(JSON.stringify(result, null, 2));
      result.length.should.be.equals(3);


      done();
    } catch (e) {
      done(e);
    }
  });



});
