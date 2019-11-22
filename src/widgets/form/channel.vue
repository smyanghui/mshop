<script>
import saleChannel from '@/api/saleChannel';
import {Select} from 'ant-design-vue';

export default {
    props: {
        emitFirstOption: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            channels: [],
            val: null
        };
    },

    mixins: [Select],

    mounted () {
        saleChannel.list().then((data) => {
            this.channels = data.data.list.map((channel) => {
                return {
                    label: channel.name,
                    value: channel.id
                };
            });

            if (this.channels.length && this.emitFirstOption) {
                this.val = this.channels[0].value;
                this.$emit('change', this.val);
            }
        });
    },

    render (createElement) {
        return createElement(
            Select,
            {
                props: Object.assign({}, this.$options.propsData, {
                    placeholder: '请选择销售渠道',
                    options: this.channels,
                    value: this.$options.propsData.value || this.val,
                    getPopupContainer: () => {
                        return document.querySelector('.ant-layout-content') || this.$options.propsData.getPopupContainer;
                    }
                }),
                on: {
                    ...this.$listeners,
                    change: (v) => {
                        this.val = v;
                        this.$emit('change', v);
                    }
                },
                directives: this.$vnode.data.directives
            }
        );
    }
};
</script>