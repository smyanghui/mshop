export default {
    mergeRoutes (allRoutes) {
        let result = [];

        for (let modu in allRoutes) {
            const moduRoute = allRoutes[modu];

            for (let route in moduRoute) {
                let curRoute = moduRoute[route];

                curRoute.path = '/' + modu + curRoute.path;
                result.push(curRoute);
            }
        }
        return result;
    }
};
