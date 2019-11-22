<script>
import CategoryApi from '@/api/category';
import {Cascader, TreeSelect} from 'ant-design-vue';

export default {
    data () {
        return {
            category: null
        };
    },

    mixins: [Cascader, TreeSelect],

    mounted () {
        CategoryApi.list().then((data) => {
            this.category = this.formatCategory(data.data);
        });
    },

    methods: {
        formatCategory (category) {
            return category.map((item) => {
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
                options: this.category,
                changeOnSelect: true
            };
        } else {
            props = {
                treeData: this.category,
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
                    placeholder: '请选择后台类目',
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