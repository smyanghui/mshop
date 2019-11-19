import ajax from '@/libs/ajax';

export default {
    getMsgCode (param = {}) {
        return ajax.post('/v1_sms_index/getSmsCode', param);
    },

    smsLogin (param = {}) {
        return ajax.post('/v1_user_login/loginBySms', param, {
            headers: {
                'app-platform': 'mp'
            }
        });
    },

    selectUserIDLogin (param = {}) {
        return ajax.post('/v1_user_login/selectUserIDLogin', param);
    }

};
