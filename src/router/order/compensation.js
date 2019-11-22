export default {
    path: '/compensation',
    meta: {
        title: '赔付',
        rules: ['compensate_manage']
    },
    icon: 'heart',
    children: [
        {
            path: 'list',
            meta: {
                title: '列表',
                rules: ['compensate_manage_list']
            },
            component: (resolve) => require(['@/views/order/compensation/list/index.vue'], resolve),
            children: [
                {
                    path: 'detail/:id',
                    meta: {
                        title: '详情',
                        rules: ['compensate_manage_show']
                    },
                    component: (resolve) => require(['@/views/order/compensation/list/detail.vue'], resolve)
                },
                {
                    path: 'create',
                    meta: {
                        title: '创建赔付单',
                        rules: ['compensate_manage_add']
                    },
                    component: (resolve) => require(['@/views/order/compensation/create/index.vue'], resolve)
                }
            ]
        }
    ]
};