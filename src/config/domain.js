const env = process.env.VUE_APP_CURENV || 'prd';

export default {
    env,
    community: {
        dev: 'http://testapi.handeson.com',
        prd: 'http://prdapi.handeson.com'
    },
    mall: {
        dev: 'http://testapi.handeson.com',
        prd: 'http://prdapi.handeson.com'
    }
};
