export default {
    path: '/set',
    meta: {
        title: '设置',
        rules: ['config_manage']
    },
    icon: 'setting',
    children: [
        // 二期
        // {
        //     path: 'confirmation',
        //     meta: {
        //         title: '自动确认'
        //     },
        //     component: (resolve) => require(['@/views/order/set/confirmation'], resolve),
        //     children: [
        //         {
        //             path: 'edit',
        //             meta: {
        //                 title: '编辑确认规则'
        //             },
        //             component: (resolve) => require(['@/views/order/set/editConfirmation'], resolve)
        //         }
        //     ]
        // },
        // 二期
        // {
        //     path: 'period',
        //     meta: {
        //         title: '售后有效期设置',
        //         rules: ['after_sale_list']
        //     },
        //     component: (resolve) => require(['@/views/order/set/period/salesPeriod'], resolve),
        //     children: [
        //         {
        //             path: 'edit',
        //             meta: {
        //                 title: '售后有效期编辑',
        //                 rules: ['after_sale_add', 'after_sale_edit']
        //             },
        //             component: (resolve) => require(['@/views/order/set/period/editSalesPeriod'], resolve)
        //         }
        //     ]
        // },
        // 二期
        // {
        //     path: 'timeout',
        //     meta: {
        //         title: '超时设置',
        //         rules: ['return_goods_addr_list']
        //     },
        //     component: (resolve) => require(['@/views/order/set/timeout/index'], resolve)
        // },
        // {
        //     path: 'salesreturn',
        //     meta: {
        //         title: '退货地址设置',
        //         rules: ['return_goods_addr_list']
        //     },
        //     component: (resolve) => require(['@/views/order/set/salesReturn/index'], resolve)
        // },
        // 二期
        // {
        //     path: 'afteraudit',
        //     meta: {
        //         title: '售后审核设置管理',
        //         rules: ['return_goods_addr_list']
        //     },
        //     component: (resolve) => require(['@/views/order/set/afterAudit/index'], resolve)
        // },
        {
            path: 'freight',
            meta: {
                title: '运费模板管理',
                rules: ['config_manage_ftpl_list']
            },
            component: (resolve) => require(['@/views/order/set/freight/templateFreight'], resolve),
            children: [{
                path: 'edit',
                meta: {
                    title: '运费模板编辑',
                    rules: ['config_manage_ftpl_edit']
                },
                component: (resolve) => require(['@/views/order/set/freight/newTemplateFreight'], resolve)
            }]
        },
        {
            path: 'distributors',
            meta: {
                title: '配送商管理',
                rules: ['config_manage_express_list']
            },
            component: (resolve) => require(['@/views/order/set/distributors/index'], resolve)
        },
        {
            path: 'orderwarn',
            meta: {
                title: '未发货订单预警',
                rules: ['index']
            },
            component: (resolve) => require(['@/views/order/set/orderwarn/index'], resolve)
        }
        // 二期
        // {
        //     path: 'dictionary',
        //     meta: {
        //         title: '数据字典',
        //         rules: ['dict_list']
        //     },
        //     component: (resolve) => require(['@/views/order/set/dictionary/dataDictionary'], resolve),
        //     children: [
        //         {
        //             path: 'edit',
        //             meta: {
        //                 title: '编辑数据字典',
        //                 rules: ['dict_edit']
        //             },
        //             component: (resolve) => require(['@/views/order/set/dictionary/editDictionary'], resolve)
        //         }
        //     ]
        // }
    ]
};