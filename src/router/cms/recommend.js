export default {
    path: '/recommend',
    meta: {
        title: '商品推荐管理',
        rules: 'cms_recommend_spu'
    },
    icon: 'share-alt',
    component: (resolve) => require(['@/views/cms/recommend'], resolve),
    children: [
        {
            path: '/edit',
            meta: {
                title: '编辑推荐组',
                rules: 'cms_recommend_spu_edit'
            },
            icon: 'share-alt',
            component: (resolve) => require(['@/views/cms/recommend/edit'], resolve)
        },
        {
            path: '/create',
            meta: {
                title: '新增推荐组',
                rules: 'cms_recommend_spu_add'
            },
            icon: 'share-alt',
            component: (resolve) => require(['@/views/cms/recommend/edit'], resolve)
        }
    ]
};
