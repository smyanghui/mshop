
<script>
import CommonApi from '@/api/common';
import {Select} from 'ant-design-vue';

export default {
    data () {
        return {
            stock: []
        };
    },

    mixins: [Select],

    mounted () {
        CommonApi.getStock2({
            user_id: this.$userInfo.manager_id
        }).then((data) => {
            this.stock = data.data.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                    ...item
                };
            });
            this.$emit('get:data', this.stock);
        });
    },

    render (createElement) {
        return createElement(
            Select,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择库存',
                    options: this.stock,
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