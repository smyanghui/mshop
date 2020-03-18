const routes = [
    {
        path: '/login',
        name: 'user/login',
        meta: {
            title: '用户登录',
            rules: 'task'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    },
    {
        path: '/address',
        name: 'address',
        meta: {
            title: '地址管理',
            rules: 'data_center'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    }
];

export default routes;
