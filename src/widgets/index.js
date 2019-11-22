import Layout from './layout';

let Components = [
    Layout
];

export default {
    install (Vue) {
        for (let Component of Components) {
            Component.install ? Component.install(Vue) : Vue.component(Component.name, Component);
        }
    }
};

export {
    Layout
};