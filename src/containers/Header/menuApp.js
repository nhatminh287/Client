export const adminMenu = [
  {
    // Quan Ly Nguoi Dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-barber",
        link: "/system/manage-barber",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      {
        // quan ly lich lam viec cua barber
        name: "menu.barber.manage-schedule",
        link: "/barber/manage-schedule",
      },
    ],
  },
  {
    // Manage Barbershop
    name: "menu.admin.barbershop",
    menus: [
      {
        name: "menu.admin.manage-barbershop",
        link: "/system/manage-barbershop",
      },
    ],
  },
  {
    // Add hairstyle
    name: "menu.admin.hairstyle",
    menus: [
      {
        name: "menu.admin.add-hairstyle",
        link: "/system/add-hairstyle",
      },
    ],
  },
  {
    // Edit hairstyle
    name: "menu.admin.edit-hairstyle",
    menus: [
      {
        name: "menu.admin.edit-hairstyle",
        link: "/system/edit-hairstyle",
      },
    ],
  }
  
];
export const barberMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {// Quan Ly dat lich cua barber 
            name: "menu.barber.manage-schedule",
            link: "/barber/manage-schedule",
      },
      {// Quan Ly khach hang
            name: "menu.barber.manage-customer",
            link: "/barber/manage-customer",
      },
    ],
  },
];
