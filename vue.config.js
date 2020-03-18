const env = process.env.VUE_APP_CURENV || 'prd';
const apiDomain = {
    dev: 'http://testmanage.handeson.com',
    uat: 'http://testmanage.handeson.com',
    prd: 'http://prdapi.handeson.com'
}[env];

console.log('当前环境：', env, apiDomain);

module.exports = {
    devServer: {
        // proxy: apiDomain
        proxy: {
            '/api': { target: apiDomain }
        }
    }
};
