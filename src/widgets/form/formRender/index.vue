<script>
/* eslint-disable vue/require-valid-default-prop */
/*
    有些默认的值需要配一下
    比如说select都是要叉叉功能的
    比如说搜索item的水平3列
    比如详情页的水平3列
    比如全部的事件一次设置，不用每个数据上去配
*/

import _ from '@/widgets/tool';
import c from './component.js';
import formSearch from './search.vue';
import formSubmit from './form.vue';
import formDetail from './detail.vue';
import {Form} from 'ant-design-vue';
export default {
    data () {
        return {
            form: '',
            s: []
        };
    },
    components: {
        formSearch,
        formSubmit,
        formDetail
    },
    props: {
        type: {
            type: String,
            default: 'search'
        }, 
        source: {
            type: Array,
            default () {
                return [];
            }
        }, 
        p: {
            type: Object,
            default () {
                return {};
            }
        },
        init: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    created () {
        this.defaultSource();
        this.initData();
        this.componentConfig();
    },
    methods: {
        defaultSource () {
            this.s = _.cloneDeep(this.source);
            this.type !== 'detail' ? this.s.forEach((current, index, arr) => {
                current.label = _.isObject(current.label) ? current.label : {};
                current.value = _.isObject(current.value) ? current.value : {};
                current.value.props = _.isObject(current.value.props) ? current.value.props : {};
                current.value.directives = _.isArray(current.value.directives) ? current.value.directives : [];
                // 设置id方便寻找
                current.value.directives.forEach(item => {
                    item.name === 'decorator' && (current.id = _.isArray(item.value) && item.value[0]);
                });
            }) : this.s.forEach((current, index, arr) => {
                current.label = _.isObject(current.label) ? current.label : {};
                current.value = _.isObject(current.value) ? current.value : {};
            });
        },
        defaultInit () {
            var cloneInit = _.clone(this.init);

            cloneInit = cloneInit.map(current => {
                return {
                    api: _.isFunction(current.api) ? current.api : '',
                    data: current.data ? current.data : '',
                    fieldNames: _.isObject(current.fieldNames) ? current.fieldNames : null,
                    format: _.isFunction(current.format) ? current.format : _.identity
                };
            });
            return cloneInit;
        },
        // 回显数据
        initData () {
            /* 
                select的options的获取方式 
                1.静态数据直接在source里面的（不用处理）
                2.接口获取
                3.非接口获取
            */
            this.type !== 'detail' ? this.noDetailData() : this.detailData();
        },
        noDetailData () {
            // 把数据分为请求和不请求的
            var partition = _.partition(this.defaultInit(), (v) => {
                return v.api;
            });

            var p = partition[0].map(current => current.api(current.data));
            // 通过api来拿值

            Promise.all(p).then(dataAll => {
                partition[0].forEach((current, index) => {
                    var d = current.format(_.maybe(dataAll[index].data).join());

                    var b = _.curryRight(this.setOptions)(value => {
                        return _.isArray(value) ? value.map(item => {
                            return current.fieldNames ? {
                                label: item[current.fieldNames.label],
                                value: item[current.fieldNames.value]
                            } : item;
                        }) : {};
                    })(this.s, d);

                    this.$set(this.s, b);
                });
            });
        },
        detailData () {
            // 把数据分为请求和不请求的
            var partition = _.partition(this.defaultInit(), (v) => {
                return v.api;
            });

            var p = partition[0].map(current => current.api(current.data));
            // 通过api来拿值

            Promise.all(p).then(dataAll => {
                var s = this.setDetail(this.s, _.maybe(dataAll[0].data).join());

                this.$set(this.s, s);
                console.log(this.s, 98);
            });
        },
        // 详情页回显数据
        setDetail (data, ajaxDate) {
            var result = [];

            data.forEach(current => {
                let v = ajaxDate[current.value.key];

                // 处理key的层级
                let dot = current.value.key ? current.value.key.split('.') : [];

                let r = dot.reduce((a, b) => {
                    return a.map(current => {
                        return current[b];
                    });
                }, _.maybe(ajaxDate));

                current.value.value = _.isFunction(current.value.customRender) ? current.value.customRender(v) : r.join();
                result.push(current);
            });
            return result;
        },
        // 动态设置某个组件的数据
        setComponent (decorator, fn) {
            if (_.isArray(decorator)) {
                decorator.forEach(current => {
                    this.displayComponent(current, fn);
                });
            } else if (_.isString(decorator)) this.displayComponent(decorator, fn);
        },
        displayComponent (decorator, fn) {
            if (this.s.some((current, index, arr) => {
                if (current.id === decorator) {
                    fn(current);
                    return true;
                } else {
                    return false;
                }
            })) {
                let t = this.s;

                this.s = [];
                this.s = t;

                // this.$set(this.s, this.s);
                this.$forceUpdate();
            }
        },
        // 设置select的options
        setOptions (data, ajaxDate, fn) {
            data.forEach(current => {
                if (current.value.type === 'select' && !current.value.props.value) {
                    var key = current.value.directives.filter(item => item.name === 'decorator');

                    key = key.length != 0 ? _.isArray(key[0].value) ? key[0].value[0] : '' : '';
                    if (ajaxDate[key]) {
                        current.value.props.options = fn ? fn(ajaxDate[key]) : ajaxDate[key];
                    }
                }
            });
            return data;
        },
        // 添加谓词函数
        componentConfig () {
            _.forEach(c, current => {
                this[`is${current.name}`] = function (item) {
                    return item.value.type === current.name;
                };
            });
        },
        renderComponent (fn = _.identity) {
            var cName = Object.keys(c);
            var nc = [];

            this.s.forEach(item => {
                cName.some(current => {
                    if (this[`is${c[current].name}`](item)) {
                        item = _.cloneDeep(item);
                        // 删除type，以免再帮到组件上的时候和自带的type冲突
                        delete item.value.type;

                        this.addOn(item);

                        if (item.isShow !== false) {
                            nc.push(fn(c[current].bind(this, item.value), item));
                        }
                        return true;
                    }
                });
            });
            return nc;
        },
        // 添加自定义事件
        addOn (item) {
            // 单个组件
            if (item.value.event) {
                this.getOn(item.value);
            } else {
                // 多个组件
                for (let key in item.value) {
                    let current = item.value[key];

                    if (_.isObject(current) && _.isArray(current.event)) {
                        this.getOn(current);
                    }
                }
            }
        },
        getOn (item) {
            this.type !== 'detail' ? this.noDetailOn(item) : this.detailOn(item);
        },
        noDetailOn (item) {
            let o = {};
            let decoratorName = item.directives.filter(current => current.name === 'decorator')[0].value[0];

            item.event.forEach(current => {
                o[current] = (...val) => {
                    this.$emit.apply(this, [`${decoratorName}:${current}`].concat(val));
                };
            });
            item.on = o;
        },
        detailOn (item) {
            let o = {};

            item.event.forEach(current => {
                o[current] = (...val) => {
                    this.$emit.apply(this, [`${item.key}:${current}`].concat(val));
                };
            });
            item.on = o;
        },
        r () {
            let d = {
                props: {
                    source: this.s || [],
                    p: this.p
                }
            };

            if (this.type === 'search') {
                return <formSearch {...d}></formSearch>;
            } else if (this.type === 'submit') {
                return <formSubmit {...d}></formSubmit>;
            } else if (this.type === 'detail') {
                return <formDetail {...d}></formDetail>;
            }
        }
    },
    render (h) {
        return this.r();
    }
};
</script>