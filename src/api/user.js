import R from '@/libs/r';

export default {
    // 登录
    getAuth (param = {}) {
        return R.ajax('/v1_sms_index/getSmsCode', param);
    },
    logout (param = {}) {
        return R.ajax('/v1_user_login/loginBySms', param);
    }
};
