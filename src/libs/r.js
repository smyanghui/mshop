import axios from 'axios';

// axios.defaults.baseURL = '//testapi.handeson.com';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// export default axios;

export default {
    ajax (url, data, method = 'post') {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: '//testapi.handeson.com',
                url,
                data,
                method,
                headers: {
                    'app-platform': 'mp',
                    'app-v': '2.0.0'
                }
            }).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
};
