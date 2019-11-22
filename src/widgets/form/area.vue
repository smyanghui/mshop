<script>
import CommonApi from '@/api/area';
import {Cascader, TreeSelect} from 'ant-design-vue';

export default {
    data () {
        return {
            area: null
        };
    },

    mixins: [Cascader, TreeSelect],

    mounted () {
        CommonApi.area((data) => {
            this.area = this.formatCategory(data);
            this.$emit('get:data', this.area);
        });
    },

    methods: {
        formatCategory (area) {
            return area.map((item) => {
                item.label = item.name;
                item.value = item.id;

                if (item.child) {
                    item.children = this.formatCategory(item.child);
                }

                return item;
            });
        }
    },

    render (createElement) {
        let props;

        if (!this.multiple) {
            props = {
                options: this.area,
                changeOnSelect: true
            };
        } else {
            props = {
                treeData: this.area,
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