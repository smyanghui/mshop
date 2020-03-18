import R from '@/libs/r';

export default {
    managerLogin (param = {}) {
        return R.ajax('/api/manager/login', param);
    },

    permission (param = {}) {
        return R.ajax('/api/manager/permissions', param, 'GET');
    }

    // managerMe (param = {}) {
    //     return R.ajax('/api/manager/me', param);
    // }

};
