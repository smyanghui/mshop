const routes = [
    {
        path: '/test',
        name: 'test',
        meta: {
            title: '支付测试'
        },
        component: resolve => require(['@/views/mall/test'], resolve)
    },
    {
        path: '/channel/vip',
        name: 'channel/vip',
        meta: {
            title: 'VIP特惠专区'
        },
        component: resolve => require(['@/views/mall/channel/vip'], resolve)
    },
    {
        path: '/user/login',
        name: 'user/login',
        meta: {
            title: '用户登录'
        },
        component: resolve => require(['@/views/mall/user/login'], resolve)
    },
    {
        path: '/user/address',
        name: 'address',
        meta: {
            title: '地址管理'
        },
        component: resolve => require(['@/views/mall/user/address'], resolve)
    },
    {
        path: '/goods/index',
        name: 'goods/index',
        meta: {
            title: '商品详情'
        },
        component: resolve => require(['@/views/mall/goods/index'], resolve)
    },
    {
        path: '/payResult/index',
        name: 'payResult/index',
        meta: {
            title: '支付结果'
        },
        component: resolve => require(['@/views/mall/payResult/index'], resolve)
    },
    {
        path: '/user/address/edit',
        name: 'address/edit',
        meta: {
            title: '编辑地址'
        },
        component: resolve => require(['@/views/mall/user/address/edit'], resolve)
    },
    {
        path: '/order/confirm',
        name: 'order/confirm',
        meta: {
            title: '确认订单'
        },
        component: resolve => require(['@/views/mall/order/confirm'], resolve)
    }
];

export default routes;
