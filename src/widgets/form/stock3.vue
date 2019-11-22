
<script>
import CommonApi from '@/api/common';
import {Select} from 'ant-design-vue';

export default {
    props: ['supplier_id'],

    data () {
        return {
            stock: []
        };
    },

    mixins: [Select],

    watch: {
        supplier_id (val) {
            this.getStock(val);
        }
    },

    mounted () {
        this.getStock(this.supplier_id);
    },

    methods: {
        getStock (val) {
            if (!val) {
                return;
            }
            CommonApi.getStock3({
                supplier_id: val
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
        }
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