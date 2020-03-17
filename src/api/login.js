import R from '@/libs/r';

export default {
    managerLogin (param = {}) {
        return R.ajax('/manager/login', param);
    },

    checkCode (param = {}) {
        return R.ajax('/manager/check/code', param);
    },

    managerMe (param = {}) {
        return R.ajax('/manager/me', param);
    }

};
