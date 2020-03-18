const routes = [
    {
        path: '/vip',
        name: 'vip',
        meta: {
            rules: 'task',
            title: 'VIP特惠专区'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            rules: 'data_center',
            title: '商品详情'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    }
];

export default routes;
