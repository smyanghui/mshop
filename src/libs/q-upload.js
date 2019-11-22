import * as Q from 'qiniu-js';
import ajax from './r';

class QUpload {
    constructor (bucket) {
        this.bucket = bucket;
        this.Q = null;
    }

    createQ () {
        return ajax.get('/upload/token/' + this.bucket).then((data) => {
            return data.data.token;
        }, () => {
            this.Q = null;
        });
    }

    upload (file, onReady, onProgress) {
        // if (!this.Q) { // token过期暂实时获取
        this.Q = this.createQ();
        // }

        return new Promise((resolve, reject) => {
            this.Q.then((token) => {
                if (!token) {
                    reject();
                    return false;
                }

                const l = Q.upload(file, null, token).subscribe({
                    next: (info) => onProgress && onProgress(info.total.percent),
                    error: reject,
                    complete: resolve
                });

                onReady && onReady(l);
            });
        });
    }

    abort (l) {
        l.unsubscribe();
    }
}

export default QUpload;