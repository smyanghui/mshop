import Vue from 'vue';
import VueRouter from 'vue-router';
import { App } from '@/libs';
import util from './util';

// 路由模块
import mall from './mall';
import active from './active';
import user from './user';

Vue.use(VueRouter);

// 全部路由
const all = { mall, active, user };
const allRoutes = util.mergeRoutes(all);

// 过滤授权的路由
const permission = App.storage('permission') || [];
const permissionArr = util.allPermission(permission);
const routes = util.routeFilt(permissionArr, allRoutes);

console.log('全部路由', allRoutes);
console.log('授权路由', routes);

const router = new VueRouter({
    routes
});

export default router;
