describe('test Feed model operation', function() {

  let row1;

  before(async (done) => {
    row1  = await Feed.create({
      picture: 'https://scontent.xx.fbcdn.net/v/t1.0-9/13728958_1407701562579431_7501307264702736046_n.jpg?oh=d8a612fb03f0a28f6e80fac2649bc68f&oe=57EEE4FD',
      message: '【活動】LFP in 台北 八月松菸誠品進駐計畫✨\n開幕進入倒數，LFP要把優惠給你和朋友們囉！即日起，兩人一起預約至松菸誠品櫃調香，並分享指定活動訊息，當天LFP將招待一位免費體驗調香哦！\n活動時間：8/1-8/3\n櫃位地點：台北松菸誠品1F正門入口處\n預約方式：FB私訊\n＃LFP香料香水實驗室 ＃台北 ＃松菸 ＃誠品 ＃LFP八月計畫 ＃客製化香水',
      type: 'photo',
      story: 'Laboratory of Fragrance & Perfume feeling nice.',
      sourceId: '1000184139997844_1407701562579431',
      createdTime: '2016-07-21T10:52:40+0000',
    });
    done();
  });

  it.only('should success.', async (done) => {
    try {
      // let users;
      let row = await Feed.find({where: {sourceId: '1000184139997844_1407701562579431'}});
      row.id.should.be.equal(row1.id);
      done();
    } catch (e) {
      done(e);
    }
  });

});
