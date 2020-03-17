import R from '@/libs/r';

export default {
    managerLogin (param = {}) {
        return R.ajax('/api/manager/login', param);
    },

    checkCode (param = {}) {
        return R.ajax('/api/manager/check/code', param);
    },

    managerMe (param = {}) {
        return R.ajax('/api/manager/me', param);
    }

};
