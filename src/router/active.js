const routes = [
    {
        path: '/test',
        name: 'test',
        meta: {
            title: '支付测试'
        },
        component: resolve => require(['@/views/active/aa'], resolve)
    }
];

export default routes;
