import R from '@/libs/r';

export default {
    getMsgCode (param = {}) {
        return R.ajax('/v1_sms_index/getSmsCode', param);
    },

    smsLogin (param = {}) {
        return R.ajax('/v1_user_login/loginBySms', param);
    },

    selectUserIDLogin (param = {}) {
        return R.ajax('/v1_user_login/selectUserIDLogin', param);
    }

};
