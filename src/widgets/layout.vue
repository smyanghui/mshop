<template>
    <div class="layout">
        <div class="header">
            <a-breadcrumb class="bd">
                <a-breadcrumb-item v-for="(item, key) of breadcrums" :key="key">
                    <a href="javascript:" v-if="item.component && item.children" @click="onClick(item.name)">
                        {{item.meta.title}}
                    </a>
                    <template v-else>{{item.meta.title}}</template>
                </a-breadcrumb-item>
            </a-breadcrumb>

            <div>
                <slot name="actions">

                </slot>
                <a-button type="default" @click="back" class="button-empty-grey" v-if="needBack && cb">返回</a-button>
            </div>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {tile} from '@/router';

export default {
    name: 'widget-layout',

    props: {
        needBack: {
            type: Boolean,
            default () {
                return false;
            }
        }
    },

    data () {
        return {
            breadcrums: [],
            cb: true
        };
    },

    mounted () {
        this.breadcrums = tile(this.$route.name);
        if (history.length <= 1) {
            this.cb = false;
        }
    },

    methods: {
        onClick (route) {
            this.$router.push({name: typeof route === 'string' ? route : route.key});
        },

        back () {
            this.$router.back(-1);
        }
    }
};
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    height: 32px;
    border-bottom: 1px solid #e8e8e8;
    align-items: center;
    box-sizing: content-box;
}

.bd {
    font-size: 15px;
}

.content{
    margin-top: 10px;
    min-width: 1040px;
}
</style>