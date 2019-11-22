import Api from '@/api/user';
import { App } from '@/libs';
export default {
    data () {
        return {
            isError: false
        };
    },
    created () {
        this.getPermission();

        this.$ajax.monitor((start, params, data) => {
            if (data && data.code !== 0) {
                // 401：登录失效
                if (data.code === 401) {
                    this.isError = true;
                    window.scrollTo(0, 0);
                    this.$refs.layout.$el.scrollTo(0, 0);
                } else {
                    this.$message.destroy();
                    this.$message.error(data.msg);
                }
            }
        });
    },
    methods: {
        logout () {
            return Api.logout();
        },
        getPermission () {
            Api.getAuth().then(res => {
                App.storage('permission', res.data);
            });
        }
    }
};
