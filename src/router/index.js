import Vue from 'vue';
import VueRouter from 'vue-router';
import util from './util';

// 路由模块
import mall from './mall';
import active from './active';
import user from './user';

Vue.use(VueRouter);

const allRoutes = {
    mall,
    active,
    user
};

const routes = util.mergeRoutes(allRoutes);

console.log('全部路由', routes);

const router = new VueRouter({
    routes
});

export default router;
