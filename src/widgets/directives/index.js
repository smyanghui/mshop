import lightbox from './lightbox';
import fold from './fold';

export default Vue => {
    const {__permission = [], $global: {noPermission, actionCookie}} = Vue.prototype;

    Vue.directive('rules', {
        inserted (el, binding, vnode) {
            const arg = binding.arg;
            let flag = true;

            if (binding.value) {
                binding.value.forEach(v => {
                    if (__permission.includes(v)) flag = false;
                });
            }

            el.onclick = () => { actionCookie(binding.value); };

            if (flag) {
                if (arg) {
                    if (arg == 'none') {
                        el.onclick = noPermission;
                    } else {
                        vnode.context[arg] = noPermission;
                    }
                    return;
                }

                el.style.display = 'none';
            }
        }
    });

    Vue.directive(lightbox.name, lightbox);
    Vue.directive(fold.name, fold);
};