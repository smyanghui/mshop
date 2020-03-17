import axios from 'axios';
import { apiDomain } from '@/api/domain';

export default {
    raxios (param) {
        return new Promise((resolve, reject) => {
            axios(param).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    ajax (ourl, data, method = 'post') {
        const curApiDomain = apiDomain.main; // 默认
        const url = /^https?:\/\//i.test(ourl) ? ourl : (curApiDomain + ourl);
        const param = {
            url,
            data,
            method,
            headers: {
                'app-platform': 'mp',
                'app-v': '2.0.0'
            }
        };

        return this.raxios(param);
    }
};

// axios.defaults.baseURL = '//testapi.handeson.com';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// export default axios;
