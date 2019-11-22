<script>
import CommonApi from '@/api/common';
import {Select} from 'ant-design-vue';

export default {
    data () {
        return {
            rgoReason: []
        };
    },

    mixins: [Select],

    mounted () {
        CommonApi.getRgoReason().then((data) => {
            this.rgoReason = data.data.map((rgoReason) => {
                return {
                    label: rgoReason.value,
                    value: rgoReason.code
                };
            });
        });
    },

    render (createElement) {
        return createElement(
            Select,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择原因',
                    options: this.rgoReason,
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