let tStyle = 'position:relative;' +
    'transition: height .5s;' +
    '-moz-transition: height .5s;' +
    '-webkit-transition: height .5s;' +
    '-o-transition: height .5s;';
let aStyle = 'display:block;' +
    'text-align:center;' +
    'line-height:40px;' +
    'height:40px;' +
    'background:#fff;' +
    'position:absolute;' +
    'bottom: 0;' +
    'width: 100%;' +
    'letf: 0;' +
    'z-index: 99;' +
    'padding-right: 23px;' +
    'box-sizing: border-box;';

let iStyleUp = 'position: absolute;' +
    'top: 18px;' +
    'width: 8px;' +
    'height: 8px;' +
    'border: 1px solid;' +
    'border-color: #1890ff #1890ff transparent transparent;' +
    'transform: rotate(-45deg);' +
    '-moz-transform: rotate(-45deg);' +
    '-webkit--transform: rotate(-45deg);';

let iStyleDown = 'position: absolute;' +
    'top: 14px;' +
    'width: 8px;' +
    'height: 8px;' +
    'border: 1px solid;' +
    'border-color: #1890ff #1890ff transparent transparent;' +
    'transform: rotate(135deg);' +
    '-moz-transform: rotate(135deg);' +
    '-webkit--transform: rotate(135deg);';

let operation = (el, binding, vnode) => {
    if (!el.$hasOperateEl) {
        el.$hasOperateEl = true;
        el.$folded = false;
        let a = document.createElement('a');
        let span = document.createElement('span');
        let i = document.createElement('i');

        span.innerHTML = '收起模块';
        a.append(span);
        a.append(i);
        span.style = 'padding-right:5px';
        a.style = aStyle;
        i.style = iStyleUp;
        a.addEventListener('click', () => {
            el.$folded = !el.$folded;
            if (el.$folded) {
                span.innerHTML = '展开模块';
                el.style = tStyle + 'height:40px;overflow: hidden;';
                i.style = iStyleDown;
            } else {
                span.innerHTML = '收起模块';
                el.style = tStyle + 'padding-bottom:40px;height:auto;overflow: hidden;';
                i.style = iStyleUp;
            }
        });
        el.style = tStyle + 'padding-bottom:40px;height:auto;overflow: hidden;';
        el.append(a);
    }
};

export default {
    name: 'fold',
    bind (el, binding, vnode) {
        operation(el, binding, vnode);
        // console.log('bind');
    },
    inserted (el, binding, vnode) {
        operation(el, binding, vnode);
        // console.log('inserted', el);
    },
    update (el, binding, vnode) {
        operation(el, binding, vnode);
        // console.log('update');
    },
    componentUpdated (el, binding, vnode) {
        operation(el, binding, vnode);
        // console.log('componentUpdated');
    },
    unbind (el, binding, vnode) {
        // console.log('unbind');
    }
};