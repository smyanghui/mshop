export default {
    path: '/center',
    meta: {
        title: '用户中心',
        rules: 'user_center'
    },
    icon: 'idcard',
    children: [
        {
            path: '/manage',
            meta: {
                title: '用户管理',
                rules: 'user_manage_list'
            },
            component: (resolve) => require(['@/views/user/center/manage'], resolve)
        }
    ]
};
