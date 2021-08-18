export default [
    // *===============================================---*
    // *--------- USER ---- ---------------------------------------*
    // *===============================================---*
    {
        path: "/apps/users/list",
        name: "apps-users-list",
        component: () => import("@/views/apps/user/users-list/UsersList.vue")
    },
    {
        path: "/apps/users/view/:id",
        name: "apps-users-view",
        component: () => import("@/views/apps/user/users-view/UsersView.vue")
    },
    {
        path: "/apps/users/edit/:id",
        name: "apps-users-edit",
        component: () => import("@/views/apps/user/users-edit/UsersEdit.vue")
    },

    // *===============================================---*
    // *--------- Content Creators ---- ---------------------------------------*
    // *===============================================---*

    {
        path: "/apps/creators/list",
        name: "apps-creators-list",
        component: () => import("@/views/apps/user/users-list/UsersList.vue")
    },
    {
        path: "/apps/creators/view/:id",
        name: "apps-creators-view",
        component: () => import("@/views/apps/user/users-view/UsersView.vue")
    },
    {
        path: "/apps/creators/edit/:id",
        name: "apps-creators-edit",
        component: () => import("@/views/apps/user/users-edit/UsersEdit.vue")
    }
];
