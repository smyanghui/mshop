export default {
    mergeRoutes (allRoutes) {
        let arr = [];

        for (let key in allRoutes) {
            const routes = allRoutes[key];

            for (let curRoute of routes) {
                curRoute.path = '/' + key + curRoute.path;
                arr.push(curRoute);
            }
        }
        return arr;
    },

    allPermission (data, arr = []) {
        for (let item of data) {
            arr.push(item.name);
            const permissionGroup = item.permission_group || [];
            if (permissionGroup.length > 0) {
                arr.push(...permissionGroup.map(item2 => item2.name));
            }
            const children = item.children || [];
            if (children.length > 0) {
                this.allPermission(children, arr);
            }
        }
        return Array.from(new Set(arr));
    },

    routeFilt (permissionArr, routes = []) {
        let arr = [];

        for (let route of routes) {
            const rules = route.meta && route.meta.rules;
            if (!rules) { continue; }
            if (permissionArr.includes(rules)) {
                arr.push(route);
            }
            if (route.children) {
                route.children = this.routeFilt(permissionArr, route.children);
            }
        }

        return arr;
    }
};
