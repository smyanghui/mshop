export default {

    // 登录
    toLogin (v) {
        // m站登录地址
        const mUrl = `/user/login?backurl=${v.$route.fullPath}`;

        v.$router.push(mUrl);
    }

};
