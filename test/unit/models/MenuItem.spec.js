describe.only('about MenuItem model operation.', function() {
  it('create tree MenuItems should success.', async (done) => {
    try {
      let newMenuItem = { icon: 'wrench', href: '#', title: '資料維護'}
      let createdMenuItem = await MenuItem.create(newMenuItem);

      let subItems = [
        { href: '/admin/user', title: '會員資料' },
        { href: '/admin/post', title: '內容資料' }
      ]
      let promises = subItems.map(subItem => MenuItem.create(subItem))
      let createdSubMenuItems = await Promise.all(promises);


      await createdMenuItem.addSubMenuItems(createdSubMenuItems);

      let findFolderMenuItem = await MenuItem.findOne({
        where: {id: createdMenuItem.id},
        include: {model: MenuItem, as: 'SubMenuItems'}
      });

      console.log(JSON.stringify(findFolderMenuItem.toJSON(), null, 2));

      // {
      //   "id": 1,
      //   "icon": "wrench",
      //   "href": "#",
      //   "title": "資料維護",
      //   "createdAt": "2016-08-11T16:00:06.919Z",
      //   "updatedAt": "2016-08-11T16:00:06.919Z",
      //   "ParentMenuItemId": null,
      //   "SubMenuItems": [
      //     {
      //       "id": 2,
      //       "icon": null,
      //       "href": "/admin/user",
      //       "title": "會員資料",
      //       "createdAt": "2016-08-11T16:00:06.989Z",
      //       "updatedAt": "2016-08-11T16:00:07.079Z",
      //       "ParentMenuItemId": 1
      //     },
      //     {
      //       "id": 3,
      //       "icon": null,
      //       "href": "/admin/post",
      //       "title": "內容資料",
      //       "createdAt": "2016-08-11T16:00:06.989Z",
      //       "updatedAt": "2016-08-11T16:00:07.079Z",
      //       "ParentMenuItemId": 1
      //     }
      //   ]
      // }


      done();
    } catch (e) {
      done(e)
    }
  });

});
