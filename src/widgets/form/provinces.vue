<script>
import supplier from '@/api/storehouse';
import {Cascader, TreeSelect} from 'ant-design-vue';

export default {
    data () {
        return {
            provinces: null
        };
    },

    mixins: [Cascader, TreeSelect],

    mounted () {
        supplier.area2(data => {
            this.provinces = this.formatProvinces(data);
        });
    },

    methods: {
        formatProvinces (provinces) {
            return provinces.map((item) => {
                item.label = item.name;
                item.value = item.id;

                if (item.children) {
                    item.children = this.formatProvinces(item.children);
                }

                return item;
            });
        }
    },

    render (createElement) {
        let props;

        if (!this.multiple) {
            props = {
                options: this.provinces
            };
        } else {
            props = {
                treeData: this.provinces,
                treeCheckable: true,
                dropdownStyle: {
                    width: '300px',
                    maxHeight: '300px',
                    overflow: 'auto'
                }
            };
        }
        return createElement(
            this.multiple ? TreeSelect : Cascader,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择区域',
                    getPopupContainer: () => {
                        return document.querySelector('.ant-layout-content') || this.$options.propsData.getPopupContainer;
                    }
                }, props),
                on: {
                    ...this.$listeners
                },
                directives: this.$vnode.data.directives
            },
            [this.$slots.default]
        );
    }
};
</script>