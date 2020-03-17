const env = process.env.VUE_APP_CURENV || 'prd';
const domains = {
    dev: {
        community: 'http://testapi.handeson.com',
        main: 'http://testapi.handeson.com'
    },
    uat: {
        community: 'http://testapi.handeson.com',
        main: 'http://testapi.handeson.com'
    },
    prd: {
        community: 'http://testapi.handeson.com',
        main: 'http://prdapi.handeson.com'
    }
};
const apiDomain = domains[env];

export {
    env,
    apiDomain
};
