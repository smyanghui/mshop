
<script>
import CommonApi from '@/api/common';
import {Select} from 'ant-design-vue';

export default {
    data () {
        return {
            supplier: []
        };
    },

    mixins: [Select],

    mounted () {
        CommonApi.getSupplier2().then((data) => {
            this.supplier = data.data.map((item) => {
                return {
                    label: item.name,
                    value: item.id
                };
            });
        });
    },

    render (createElement) {
        return createElement(
            Select,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择供应商',
                    options: this.supplier,
                    showSearch: true,
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