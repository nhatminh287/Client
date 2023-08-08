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
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      {
        // quan ly ke hoach kham benh cua bac si
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    // Manage Clinic
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    // Manage Specialty
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    // Manage HandBook
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {// Quan Ly ke hoach kham benh cua bac si 
            name: "menu.doctor.manage-schedule",
            link: "/doctor/manage-schedule",
      },
      {// Quan Ly benh nhan kham benh cua bac sy
            name: "menu.doctor.manage-patient",
            link: "/doctor/manage-patient",
      },
    ],
  },
];
