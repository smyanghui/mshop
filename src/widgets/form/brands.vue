<script>
import CommonApi from '@/api/common';
import {Select} from 'ant-design-vue';

export default {
    data () {
        return {
            brands: []
        };
    },

    mixins: [Select],

    mounted () {
        CommonApi.getBrandList().then((data) => {
            this.brands = data.data.list.map((brand) => {
                return {
                    label: brand.name,
                    value: brand.id
                };
            });
        });
    },

    methods: {
        filterFomat (input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
    },

    render (createElement) {
        return createElement(
            Select,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择品牌',
                    options: this.brands,
                    showSearch: true,
                    filterOption: this.filterFomat,
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