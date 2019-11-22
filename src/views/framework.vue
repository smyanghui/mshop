<template>
    <a-layout style="height: 100%;">
        <a-alert v-if="isError" type="error" closable style="margin: 10px;">
            <p slot="message" align="center" style="margin: 0;">
                登录超时，请<a @click="onResetLogion">重新登录</a>!
            </p>
        </a-alert>
        <a-layout-header class="header">
            <strong class="title"
                ><img
                    style="margin-right:10px"
                    height="40"
                    src="@/assets/logo-2.png"
                />{{ title }}</strong
            >
            <a-menu
                ref="nav"
                theme="dark"
                mode="horizontal"
                style="line-height:50px;"
                v-model="center"
                :selectable="false"
                @click="onMenuClickNav"
            >
                <a-menu-item :key="item.key" v-for="item in navList">{{
                    item.name
                }}</a-menu-item>
            </a-menu>
            <div class="user-info">
                <a-dropdown :trigger="['click']" v-if="$userInfo && !isError">
                    <span class="info"
                        >{{
                            $userInfo.username
                                ? `欢迎，${$userInfo.username}`
                                : ""
                        }}
                        <a-icon type="down"
                    /></span>
                    <a-menu slot="overlay">
                        <a-menu-item @click="onClose">退出登录</a-menu-item>
                    </a-menu>
                </a-dropdown>
                <a-avatar v-else icon="user" @click="onResetLogion" />
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider v-bind="layoutConf">
                <a-menu
                    mode="inline"
                    v-model="selectedKey"
                    dongdong="df"
                    class="sidebar"
                    :openKeys.sync="openKeys"
                    @openChange="openSidebar"
                    @click="onMenuClick"
                    theme="dark"
                >
                    <template v-for="item of routes">
                        <a-menu-item v-if="item.component" :key="item.name">
                            <strong
                                ><a-icon :type="item.icon" /><span>{{
                                    item.meta.title
                                }}</span></strong
                            >
                        </a-menu-item>
                        <a-sub-menu v-else :key="item.name">
                            <strong slot="title"
                                ><a-icon :type="item.icon" /><span>{{
                                    item.meta.title
                                }}</span></strong
                            >
                            <template v-for="child of item.children">
                                <!--如果没有component，表示它有需要显示的儿子-->
                                <a-sub-menu
                                    v-if="!child.component"
                                    :key="child.name"
                                    :title="child.meta.title"
                                >
                                    <a-menu-item
                                        v-for="grandchild of child.children"
                                        :key="grandchild.name"
                                        >{{
                                            grandchild.meta.title
                                        }}</a-menu-item
                                    >
                                </a-sub-menu>

                                <a-menu-item v-else :key="child.name">{{
                                    child.meta.title
                                }}</a-menu-item>
                            </template>
                        </a-sub-menu>
                    </template>
                </a-menu>
            </a-layout-sider>

            <div style="flex: 1; overflow:hidden">
                <TabScrool
                    :list="navTabs"
                    @update:data="v => (navTabs = v)"
                    v-if="hasNavTabs"
                    @del="onTabScrollDel"
                />
                <a-layout
                    ref="layout"
                    style="padding:16px; overflow-y: scroll;"
                    :style="{
                        height: `calc(100vh - ${hasNavTabs ? '80px' : '50px'})`
                    }"
                >
                    <!-- 折叠按钮 menu-fold -->
                    <div
                        class="menu-fold"
                        @click="
                            () => (layoutConf.collapsed = !layoutConf.collapsed)
                        "
                    >
                        <a-icon
                            class="trigger"
                            :type="
                                layoutConf.collapsed
                                    ? 'caret-right'
                                    : 'caret-left'
                            "
                        />
                    </div>
                    <a-layout-content class="content">
                        <a-locale-provider
                            :locale="zhCN"
                            class="animated infinte fadeIn delay-0s"
                        >
                            <!-- <keep-alive :include="needDeleteView">
                                <router-view v-if="isRouterAlive"></router-view>
                            </keep-alive> -->
                            <router-view v-if="isRouterAlive"></router-view>
                        </a-locale-provider>
                        <a-spin
                            size="large"
                            v-show="isLoading"
                            class="loading"
                        />
                    </a-layout-content>
                </a-layout>
            </div>
        </a-layout>
        <!-- <a-layout-footer></a-layout-footer> -->
    </a-layout>
</template>

<script>
import { routes, tile, nav, defaultKey } from '../router';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { _ } from '@/libs';
import CommonMethod from '@/widgets/mixins/frame';
import TabScrool from '@/widgets/layout/tabScrool';
// import './index.css';

export default {
    data () {
        return {
            zhCN,
            routes,
            selectedKey: [],
            breadcrums: [],
            isLoading: false,
            openKeys: [],
            center: [],
            mains: {},
            navList: nav,
            layoutConf: {
                trigger: null,
                collapsible: true,
                collapsed: false,
                collapsedWidth: 0,
                theme: 'light',
                width: '200'
            },
            navTabs: [],
            needDeleteView: '',
            title: '汉薇商城运营管理系统',
            isRouterAlive: true
        };
    },
    components: { TabScrool },
    mixins: [CommonMethod],
    computed: {
        hasNavTabs () {
            return !!this.navTabs.length;
        }
    },
    provide () {
        return {
            reload: this.reload
        };
    },
    mounted () {
        this.$router.beforeEach((to, from, next) => {
            this.isLoading = true;
            const {
                meta: { rules = [] }
            } = to;

            if (rules.length) {
                this.$global.actionCookie(rules);
            }
            next();
        });

        this.$router.afterEach((to, from) => {
            const breadcrums = this.getMenuByRouter();

            this.isLoading = false;
            if (!this.isErrorPage(to.name)) return;
            this.breadcrums = breadcrums;
            this.selectedKey = breadcrums.length
                ? [this.breadcrums.filter(val => val.component)[0].name]
                : [];
            this.openSidebar([this.$route.name]);
            to.meta.navTab && this.setNavTabs(to);
            // this.setNavTabs(to);
        });
        if (!_.pathname(location.pathname).includes('/')) {
            this.center = [_.pathname(location.pathname)];
        } else {
            this.center = [defaultKey];
        }
        // 设置title
        nav.forEach(item => {
            if (item.key === this.center) {
                document.title = `${item.name}-${this.title}`;
            }
        });

        this.$nextTick(() => {
            this.$global.contentHeight = this.$refs.layout.$el.clientHeight;
        });
    },
    methods: {
        onTabScrollDel (data) {
            // @todo 预留用来设置是否清楚相应的keepalive的缓存
            this.$nextTick(() => {
                this.needDeleteView = data
                    .map(item => {
                        return item.value;
                    })
                    .join(',');
            });
        },

        onMenuClickNav (route) {
            const { key } = route;

            if (window.location.pathname.includes(key)) return;

            const o = window.open(`${window.location.origin}/center/${key}#/`);

            o.focus();
        },
        onMenuClick (route) {
            const name = typeof route === 'string' ? route : route.key;

            if (this.$route.name === route.key) {
                return;
            }

            this.$router.push({ name });
        },

        setNavTabs (route) {
            const { name, fullPath, meta } = route;
            const itemRoute = {
                label: meta.title,
                value: name,
                path: fullPath,
                active: true,
                meta
            };

            if (this.hasNavTabs) {
                this.navTabs.forEach(item => {
                    item.active = false;
                });
                if (!this.navTabs.map(v => v.value).includes(name)) {
                    if (this.navTabs.length >= 10) {
                        this.navTabs.shift();
                    }
                    this.navTabs.push(itemRoute);
                } else {
                    this.navTabs.forEach(item => {
                        if (item.value === name) {
                            item.active = true;
                        }
                    });
                }
            } else {
                this.navTabs = [itemRoute];
            }
            this.needDeleteView = this.navTabs
                .map(item => item.value)
                .join(',');
        },

        bcCanClick (route) {
            return route.component && route.children;
        },

        getMenuByRouter () {
            return tile(this.$route.name);
        },

        openSidebar (names) {
            if (!names.length) {
                this.openKeys = [];
                return false;
            }

            let openKeys = tile(names[names.length - 1]).map(v => v.name);

            if (openKeys.toString() === this.openKeys.toString()) {
                this.openKeys = [];
            } else {
                this.openKeys = openKeys;
            }
        },
        isErrorPage (name) {
            if (!name) {
                this.$router.replace('/404');
                return false;
            }
            return true;
        },
        onResetLogion () {
            this.$cookies.remove('token');
            window.location.reload();
        },
        onClose () {
            this.logout().then(res => {
                this.onResetLogion();
            });
        },
        reload () {
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>

<style scoped lang="less">
* {
    font-family: "微软雅黑";
}

.header {
    position: relative;
    padding-left: 0px;
    height: 50px;
    line-height: 50px;
    .ant-menu-item-active {
        background: #1890ff;
    }
}

.ant-layout {
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
    .ant-layout-sider {
        overflow: auto;
        background-color: #001529 !important;

        &::-webkit-scrollbar-track-piece {
            background-color: #001529; /*滚动条的背景颜色*/
            -webkit-border-radius: 0; /*滚动条的圆角宽度*/
        }
        &::-webkit-scrollbar {
            width: 6px; /*滚动条的宽度*/
            -webkit-border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb:hover {
            /*滚动条的hover样式*/
            height: 50px;
            background-color: #bbb;
            -webkit-border-radius: 4px;
        }
    }
    .menu-fold {
        padding: 13px 6px;
        position: absolute;
        left: -5px;
        top: 45%;
        font-size: 18px;
        cursor: pointer;
        background-color: #fff;
        z-index: 999;
    }
}

.user-info {
    position: absolute;
    right: 40px;
    top: 0px;
    .info {
        cursor: pointer;
        color: #fff;
        opacity: 0.8;
    }
}

.logo {
    background: url(../assets/logo.jpg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 170px;
    height: 64px;
    float: left;
    margin-right: 20px;
}

.title {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
    float: left;
    margin-right: 50px;
    padding-left: 20px;
}

.sidebar {
    height: 100%;
    border-right: 0px;
    position: relative;
    z-index: 10;
}

.content {
    background: #fff;
    padding: 10px;
    margin: 0px;
    display: block;
    position: relative;
    min-height: auto;
    overflow: auto;
}

.loading {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 100px;
    left: 50%;
}

strong {
    font-weight: 400;
}
</style>
