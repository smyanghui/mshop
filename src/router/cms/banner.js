export default {
    path: '/banner',
    meta: {
        title: '轮播管理',
        rules: 'cms_slide_manage_list'
    },
    icon: 'picture',
    component: (resolve) => require(['@/views/cms/banner'], resolve),
    children: [
        {
            path: '/create',
            meta: {
                title: '新增轮播图',
                rules: 'cms_slide_manage_add'
            },

            component: (resolve) => require(['@/views/cms/banner/create'], resolve)
        },
        {
            path: '/detail',
            meta: {
                title: '轮播图详情',
                rules: 'cms_slide_manage_edit'
            },

            component: (resolve) => require(['@/views/cms/banner/detail'], resolve)
        }
    ]
};
