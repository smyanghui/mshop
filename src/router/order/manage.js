export default {
    path: '/manage',
    meta: {
        title: '订单',
        rules: ['order_manage']
    },
    icon: 'crown',
    children: [
        {
            path: 'list',
            meta: {
                title: '列表',
                rules: ['order_manage_list']
            },
            component: (resolve) => require(['@/views/order/manage/list/index'], resolve),
            children: [
                {
                    path: 'detail/:orderId/:userId',

                    meta: {
                        title: '详情',
                        rules: ['order_manage_show']
                    },
                    component: (resolve) => require(['@/views/order/manage/list/detail'], resolve)
                },
                {
                    path: 'create',

                    meta: {
                        title: '手动创建订单',
                        rules: ['order_manage_add']
                    },
                    component: (resolve) => require(['@/views/order/manage/create'], resolve)
                },
                {
                    path: 'deliver/:orderId/:userId',

                    meta: {
                        title: '发货',
                        rules: ['delivery']
                    },
                    component: (resolve) => require(['@/views/order/manage/list/deliver'], resolve)
                }
            ]
        },
        {
            path: 'examine',
            meta: {
                title: '异常风控审核',
                rules: ['risk_manage_list']
            },
            children: [
                {
                    path: 'detail/:orderId/:userId',

                    meta: {
                        title: '详情',
                        rules: ['risk_manage_show']
                    },
                    component: (resolve) => require(['@/views/order/manage/list/detail'], resolve)
                }
            ],
            component: (resolve) => require(['@/views/order/manage/examine/index'], resolve)
        },
        {
            path: 'event',
            meta: {
                title: '系统异常事件',
                rules: ['abnormal_manage_list']
            },
            component: (resolve) => require(['@/views/order/manage/event/index'], resolve)
        },
        {
            path: 'appropriate',
            meta: {
                title: '拨付记录',
                rules: ['appropriate_manage_list']
            },
            component: (resolve) => require(['@/views/order/manage/appropriate/list/index'], resolve),
            children: [
                {
                    path: 'detail/:id',
                    meta: {
                        title: '拨付详情',
                        rules: ['appropriate_manage_show']
                    },
                    component: (resolve) => require(['@/views/order/manage/appropriate/detail/index'], resolve)
                }
            ]
        }
        // 先不用放出来

        /* {
            path: 'delivery',
            meta: {
                title: '发货',
                rules: ['delivery']
            },
            children: [
                {
                    path: 'list',
                    meta: {
                        title: '列表',
                        rules: ['delivery_list']
                    },
                    component: (resolve) => require(['@/views/order/manage/delivery/index'], resolve),
                    children: [
                        {
                            path: 'detail/:orderId/:userId',

                            meta: {
                                title: '详情',
                                rules: ['delivery_list']
                            },
                            component: (resolve) => require(['@/views/order/manage/delivery/detail'], resolve)
                        },
                        {
                            path: 'deliver/:orderId/:userId',

                            meta: {
                                title: '发货',
                                rules: ['delivery']
                            },
                            component: (resolve) => require(['@/views/order/manage/delivery/deliver'], resolve)
                        }
                    ]
                }
            ]
        },
        */
        /* {
            path: 'disbursementRecord',
            meta: {
                title: '交付记录',
                rules: ['delivery']
            },
            children: [
                {
                    path: 'order',
                    meta: {
                        title: '订单',
                        rules: ['delivery_list']
                    },
                    component: (resolve) => require(['@/views/order/manage/disbursementRecord/order/index'], resolve),
                    children: []
                },
                {
                    path: 'afterSale',
                    meta: {
                        title: '售后单',
                        rules: ['delivery_list']
                    },
                    component: (resolve) => require(['@/views/order/manage/disbursementRecord/afterSale/index'], resolve),
                    children: []
                }
            ]
        } */
    ]
};