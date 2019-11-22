export default {
    path: '/stock',
    meta: {
        title: '库存'
    },
    icon: 'gift',
    children: [
        {
            path: 'info',
            meta: {
                title: '基础信息'
            },
            children: [
                {
                    path: 'list',
                    meta: {
                        title: '库存组织管理'
                    },
                    component: (resolve) => require(['@/views/order/stock/info/list'], resolve)
                },
                {
                    path: 'createEdit',
                    meta: {
                        title: '创建/编辑'
                    },
                    component: (resolve) => require(['@/views/order/stock/info/createEdit'], resolve)
                }
            ]
        },
        {
            path: 'find',
            meta: {
                title: '库存查询'
            },
            children: [
                {
                    path: 'goodsManage',
                    meta: {
                        title: '仓库商品管理'
                    },
                    component: (resolve) => require(['@/views/order/stock/find/goodsManage'], resolve)
                },
                {
                    path: 'freezeInfo',
                    meta: {
                        title: '库存冻结明细查询'
                    },
                    component: (resolve) => require(['@/views/order/stock/find/freezeInfo'], resolve)
                },
                {
                    path: 'storehouse',
                    meta: {
                        title: '仓库库存查询'
                    },
                    component: (resolve) => require(['@/views/order/stock/find/storehouse'], resolve)
                },
                {
                    path: 'async',
                    meta: {
                        title: '库存同步查询'
                    },
                    component: (resolve) => require(['@/views/order/stock/find/async'], resolve)
                }
            ]
        }
    ]
};