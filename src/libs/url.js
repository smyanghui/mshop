import vueCookies from 'vue-cookies';

export default {
    getQuery (url) {
        let queryString = url.match(/\?([^?#]*)#?/);

        if (!queryString || !queryString[1]) {
            return {};
        }
        let queryArr = queryString[1].split('&');
        let queryObj = {};

        queryArr.forEach((item) => {
            let split = item.split('=');

            queryObj[split[0]] = split[1];
        });
        return queryObj;
    },
    makeQuery (params) {
        let arr = [];

        for (let key in params) {
            let value = params[key];

            arr.push(`${key}=${value}`);
        }

        return arr.join('&');
    },
    GetRequest () {
        var url = location.hash; // 获取url中"?"符后的字串
        var theRequest = {};

        if (url.indexOf('?') !== -1) {
            var str = url.substr(1);
            var strs = str.split('&');

            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]).replace('/', '');
            }
        }
        return theRequest;
    },
    // 获取当前嵌入的平台，入口地址加上参数pt获取
    curPlat () {
        const curplat = vueCookies.get('curplat');

        if (curplat) {
            return curplat;
        }
        const pt = this.getQuery(location.href).pt;
        const codePt = { 1: 'web', 2: 'wxmini', 3: 'app' };
        let urlPt = codePt[1];

        if (codePt) {
            urlPt = codePt[pt];

            vueCookies.set('curplat', urlPt);
        }
        return urlPt;
    }
};
