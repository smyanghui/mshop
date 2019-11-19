import wx from 'weixin-js-sdk';

export default {
    isMiniprogram () {
        return new Promise((resolve, reject) => {
            var ua = navigator.userAgent.toLowerCase();
            var envType = false;

            if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信环境
                wx.miniProgram.getEnv(function (res) {
                    if (res.miniprogram) { // 小程序环境下逻辑
                        envType = true;
                        resolve(envType);
                    } else { // 非小程序环境下逻辑
                        envType = false;
                        resolve(envType);
                    }
                });
            } else { // 非微信环境逻辑
                envType = false;
                resolve(envType);
            }
        });
    },

    isIos () {
        // 判断app设备
        if (/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

};
