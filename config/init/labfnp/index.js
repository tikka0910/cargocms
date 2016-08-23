
const ScentNoteData = require('./data/ScentNote');
const ScentData = require('./data/Scent');
const ScentDetail = require('./data/ScentDetail.json');
const FeelingData = require('./data/Feeling');

module.exports.init = async () => {
  try {

    ScentDetail.rows.forEach(function(scentDetail){
      Scent.create({
        sequence: parseInt(scentDetail.name.replace(/[^0-9]+/, '')),
        name: scentDetail.name,
        title: scentDetail.title,
        description: scentDetail.description,
      })
    });

    ScentNoteData.rows.forEach(function(row) {
      ScentNote.create(row).then(function(scentNote) {

        ScentData.rows.forEach(function(row) {
          if (row.scentNote == scentNote.title) {
            row.scents.forEach(function(scentName) {
              Scent.findOne({
                where: {
                  name: scentName,
                }
              }).then(function(scent) {
                if (scent) {
                  scent.feelings = FeelingData[scentName] || [];
                  scent.ScentNoteId = scentNote.id;
                  scent.save();
                }
              });
            })
          }
        });

      });
    });

    let newMenuItems = [
      { icon: 'home', href: '/admin/dashboard', title: '控制台', sequence: 0},
      { icon: 'wrench', href: '#', title: '資料維護', sequence: 1},
      { icon: 'puzzle-piece', href: '#', title: '實驗室', sequence: 2},
    ]

    let promises = newMenuItems.map(menuItem => MenuItem.create(menuItem))
    let createdMenuItems = await Promise.all(promises);

    let newSubMenuItems = [
      { href: '/admin/user', title: '會員資料', sequence: 20},
      { href: '/admin/post', title: '內容資料', sequence: 30},
      { href: '/admin/labfnp/recipe', title: '配方資料', sequence: 40},
      { href: '/admin/labfnp/scent', title: '香味分子', sequence: 50},
      { href: '/admin/labfnp/scentnote', title: '香調', sequence: 60},
      { href: '/admin/labfnp/feeling', title: '感覺', sequence: 70},
    ]


    promises = newSubMenuItems.map(menuItem => MenuItem.create(menuItem))
    let createdSubMenuItems = await Promise.all(promises);
    createdMenuItems[1].addSubMenuItems(createdSubMenuItems);

    newSubMenuItems = [
      { href: '/admin/mock', title: '隨機資料表', sequence: 20},
    ]

    promises = newSubMenuItems.map(menuItem => MenuItem.create(menuItem))
    createdSubMenuItems = await Promise.all(promises);
    createdMenuItems[2].addSubMenuItems(createdSubMenuItems);

    const feeling = {
      title: '花香',
      scentName: 'BT99',
      totalRepeat: 4,
      score: 10,
    };
    await Feeling.create(feeling);



  } catch (e) {
    console.error(e);
  }
};
