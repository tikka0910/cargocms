module.exports.init = async () => {
  try {
    for (let i = 0; i < 100; i ++) {
      User.create({
        username: `user${i}`,
        email: `user${i}@gmail.com`,
        firstName: '王',
        lastName: '大明',
        birthday: '1970/1/1',
        phone1: '0412345678',
        phone2: '0987123456',
        address: '台中市西區台灣大道二段2號 16F-1',
        address2: '台中市西區台灣大道二段2號 16F-1'
      }).then(function(user) {
        Passport.create({
          provider: 'local',
          password: 'passport',
          UserId: user.id
        });
      });
    }
    Slogan.create({
      content: 'OK',
      source: 'OK',
    });
  } catch (e) {
    console.error(e);
  }
};
