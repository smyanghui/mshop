import axios from 'axios';
import domain from '@/config/domain';

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
        const apiDomain = domain.mall[domain.env]; // 默认卖场
        const url = /^https?:\/\//i.test(ourl) ? ourl : (apiDomain + ourl);
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
