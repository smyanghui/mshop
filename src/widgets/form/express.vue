<script>
import CommonApi from '@/api/common';
import {Select} from 'ant-design-vue';

export default {
    data () {
        return {
            express: []
        };
    },

    mixins: [Select],

    mounted () {
        CommonApi.getExpress().then((data) => {
            this.express = data.data.list.map((item) => {
                return {
                    label: item.company_name,
                    value: item.express_company_no
                };
            });
            this.$emit('get:data', this.express);
        });
    },

    render (createElement) {
        return createElement(
            Select,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择配送商',
                    options: this.express,
                    showSearch: true,
                    optionFilterProp: 'children',
                    getPopupContainer: () => {
                        return document.querySelector('.ant-layout-content') || this.$options.propsData.getPopupContainer;
                    }
                }),
                on: this.$listeners,
                directives: this.$vnode.data.directives
            }
        );
    }
};
</script>