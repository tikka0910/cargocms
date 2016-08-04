/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = async (cb) => {
  if(!sails.config.urls) sails.config.urls = {afterSignIn: "/"};

  console.log("=== Setup express-helpers ===");
  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);

  let porductionInitDb = async () => {
    let {connection} = sails.config.models;
    let {environment} = sails.config;

    if(connection == 'mysql' && environment == 'production'){

      let {database} = sails.config.connections.mysql;

      let tableList = await sequelize.query(`
        select table_name
        from information_schema.tables
        where table_schema='${database}';
      `);

      if(tableList[0].length == 0){
        sails.log.info("=== porduction init database ===");
        await sequelize.sync({ force: 'drop' });
      }
    }
  }

  try {

    sails.log.info("=== start bootstrap ===");
    sails.services.passport.loadStrategies();
    await porductionInitDb();

    let adminRole = await Role.findOrCreate({
      where: {authority: 'admin'},
      defaults: {authority: 'admin'}
    });
    let userRole = await Role.findOrCreate({
      where: {authority: 'user'},
      defaults: {authority: 'user'}
    });

    let user = await User.create({
      username: 'user',
      email: 'user@gmail.com',
      firstName: '王',
      lastName: '大明'
    });
    let passport = await Passport.create({provider: 'local', password: 'user', UserId: user.id});



    let admin = {
      username: 'admin',
      email: 'admin@gmail.com',
      firstName: '管',
      lastName: '李仁'
    };

    let adminUser = await User.findOrCreate({
      where: {username: 'admin'},
      defaults: admin
    });

    await Passport.findOrCreate({
      where: {provider: 'local', UserId: adminUser[0].id},
      defaults: {provider: 'local', password: 'admin', UserId: adminUser[0].id}
    });

    adminUser[0].addRole(adminRole[0]);

    const {environment} = sails.config;
    if (environment === 'development') {
      sails.log.info("init Dev data", environment);

      for (let i = 0; i < 30; i ++) {
        let user = await User.create({
          username: `user${i}`,
          email: `user${i}@gmail.com`,
          firstName: '王',
          lastName: '大明'
        });
        let passport = await Passport.create({provider: 'local', password: 'user', UserId: user.id});
      }


      const post = await Post.create({
        title: '香味的一沙一世界5',
        content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
        cover: 'http://www.labfnp.com/modules/core/img/update1.jpg',
        url: 'http://localhost:5001/blog/flower',
        abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
        UserId: user.id
      })
      const tag = await Tag.create({
        title: '花'
      });
      await post.addTag(tag.id);
    }

    cb();
  } catch (e) {
    cb(e);
  }
};
