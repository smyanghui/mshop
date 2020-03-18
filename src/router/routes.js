export default [
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404',
            rules: 'index'
        },
        component: resolve => require(['@/views/components/404'], resolve)
    },
    {
        path: '/',
        name: 'main',
        meta: {
            title: '首页',
            rules: 'index'
        },
        icon: 'home',
        component: (resolve) => {
            require(['@/views/components/main'], resolve);
        }
    }
];
