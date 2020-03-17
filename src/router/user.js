const routes = [
    {
        path: '/login',
        name: 'user/login',
        meta: {
            title: '用户登录'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    },
    {
        path: '/address',
        name: 'address',
        meta: {
            title: '地址管理'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    },
    {
        path: '/address/edit',
        name: 'address/edit',
        meta: {
            title: '编辑地址'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    }
];

export default routes;
