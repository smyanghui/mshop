const routes = [
    {
        path: '/vip',
        name: 'vip',
        meta: {
            title: 'VIP特惠专区'
        },
        component: resolve => require(['@/views/mall/aa'], resolve)
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            title: '商品详情'
        },
        component: resolve => require(['@/views/mall/aa'], resolve)
    },
    {
        path: '/complete',
        name: 'complete',
        meta: {
            title: '支付结果'
        },
        component: resolve => require(['@/views/mall/aa'], resolve)
    },
    {
        path: '/confirm',
        name: 'confirm',
        meta: {
            title: '确认订单'
        },
        component: resolve => require(['@/views/mall/aa'], resolve)
    }
];

export default routes;
