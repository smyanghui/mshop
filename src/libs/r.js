import axios from 'axios';
import VueCookies from 'vue-cookies';
// import { apiDomain } from '@/api/domain';

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
        // const curApiDomain = apiDomain.main; // 默认
        const url = ourl; // /^https?:\/\//i.test(ourl) ? ourl : (curApiDomain + ourl);
        const param = {
            url,
            data,
            method,
            headers: {
                Authorization: VueCookies.get('token') || ''
                // 'app-platform': 'mp',
                // 'app-v': '2.0.0'
            }
        };

        return this.raxios(param);
    }
};
