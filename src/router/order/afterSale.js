export default {
    path: '/afterSale',
    meta: {
        title: '售后',
        rules: ['order_after_sale']
    },
    icon: 'alert',
    children: [
        {
            path: 'list',
            name: 'afterSaleList',
            meta: {
                title: '列表',
                rules: ['after_sale_list']
            },
            component: (resolve) => require(['@/views/order/list'], resolve)
        },
        {
            path: 'detail',
            meta: {
                title: '详情',
                rules: ['after_sale_view']
            },
            component: (resolve) => require(['@/views/order/detail'], resolve)
        }
    ]
};
