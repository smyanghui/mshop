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
            component: (resolve) => require(['@/views/order/afterSale/list/index.vue'], resolve),
            children: [
                {
                    path: 'detail/:ro_seq/:userId',
                    meta: {
                        title: '详情',
                        rules: ['after_sale_view']
                    },
                    component: (resolve) => require(['@/views/order/afterSale/list/detail.vue'], resolve)
                }
            ]
        }
        /* {
            path: 'search',
            name: 'search',
            meta: {
                title: '搜索区',
                rules: ['index']
            },
            component: (resolve) => require(['@/views/test/formRender/search.vue'], resolve)
        },
        {
            path: 'form',
            name: 'form',
            meta: {
                title: '表单区',
                rules: ['index']
            },
            component: (resolve) => require(['@/views/test/formRender/form.vue'], resolve)
        },
        {
            path: 'detail',
            name: 'detail',
            meta: {
                title: '详情区',
                rules: ['index']
            },
            component: (resolve) => require(['@/views/test/formRender/detail.vue'], resolve)
        } */
    ]
};