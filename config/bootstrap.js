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
    let post = await Post.create({title: 'testTitle', UserId: user.id});




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


    cb();
  } catch (e) {
    cb(e);
  }
};
