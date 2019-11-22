let options = {};
const DOMAIN = 'http://testmonitor-static.handeson.com';

function url (obj) {
    let arr = [];

    obj = Object.assign({}, options, obj);

    for (let name in obj) {
        let value = obj[name];

        arr.push(name + '=' + encodeURIComponent(typeof value == 'object' ? JSON.stringify(value) : value));
    }

    return DOMAIN + '?' + arr.join('&');
}

const Monitor = {
    report (event, params) {
        let image = document.createElement('img');

        image.style.display = 'none';
        image.src = url({
            event,
            ...params,
            network: 'wifi'
        });
        image.onload = image.oncomplete = image.onerror = () => {
            image.parentNode.removeChild(image);
            image = null;
        };
        document.body.appendChild(image);
    }
};

export default (opts) => {
    options = opts;
    return Monitor;
};