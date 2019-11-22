<template>
    <div class="tab-scrool" :style="{ height: data.length ? 'auto' : '0px' }">
        <a
            class="item-a"
            v-for="(item, index) in data"
            :key="index"
            href="javascript:;"
        >
            <span
                @click.stop="onTabClick(item)"
                :class="{ active: item.active }"
                >{{ item.label }}</span
            >
            <a-icon
                type="close"
                v-if="!item.active"
                @click.stop="removeStorage(index)"
            />
        </a>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            data: []
        };
    },
    created () {
        this.data = [...this.list];
    },
    watch: {
        list: {
            deep: true,
            handler (v) {
                this.data = [...v];
            }
        }
    },
    methods: {
        removeStorage (i) {
            // let data = this.data.splice(i, 1);

            this.$emit('update:data', this.data);
            this.$emit('del', this.data);
        },
        onTabClick (data) {
            this.data.forEach(item => {
                item.active = false;
            });
            data.active = true;
            data.meta.keepAlive = true;
            this.$router.push({ path: data.path });
        }
    }
};
</script>

<style lang="less" scoped>
.tab-scrool {
    padding: 0 16px;
    margin-left: 0px;
    height: 30px;
    background: #001529;
    background: #fff;
    display: flex;
    overflow: hidden;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 10;
    .item-a {
        height: 30px;
        padding: 0 10px;
        color: rgba(0, 0, 0, 0.85);
        transition: all 0.4s;
        &:hover span {
            border-bottom: 2px solid #1890ff;
            color: #1890ff;
        }
        &:last-child {
            border-right: 0;
        }
        .anticon-close {
            color: #ccc;
            font-size: 12px;
        }
        span {
            margin-right: 10px;
            line-height: 28px;
            display: inline-block;
            transition: all 0.4s;
            border-bottom: 2px solid #fff;
            &.active {
                border-bottom: 2px solid #1890ff;
                color: #1890ff;
            }
        }
    }
}
</style>
