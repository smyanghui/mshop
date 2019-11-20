<template>
    <div class="out_box">

        <div class="login_box">
            <SmsForm
                v-if="pType === 1"
                @subLoginCheck="loginCheck"
            />
        </div>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';
// import Intom from '@/libs/intom';
// import Helper from '@/libs/helper';
import SmsForm from './smsForm';
// import Accounts from './components/accounts';
// import logo from '@/assets/images/login/logo.png';
import './index.less';

export default {
    data () {
        return {
            td: {},
            pType: 1,
            userInfo: {}
        };
    },

    created () {
        this.curDate();
    },

    components: {
        SmsForm
        // Accounts
    },

    methods: {
        curDate () {
            let newDate = new Date();

            this.td = {
                month: newDate.getMonth() + 1,
                today: newDate.getDate()
            };
        },
        // 验证手机登录接口返回
        loginCheck (data) {
            const users = data.user_id || [];

            if (users.length === 1) {
                // 登录成功
                const token = data.token;

                this.$cookies.set('token', token);

                // 根据不同平台，跳转页面
                const curpt = 'web'; // Intom.curPlat();

                if (curpt === 'web') {
                    const backurl = this.$route.query.backurl;

                    if (backurl) {
                        this.$router.go(-1);
                    } else {
                        this.$router.replace('/channel/vip');
                    }
                } else if (curpt === 'wxmini') {
                    // aa
                } else if (curpt === 'app') {
                    // aa
                } else {
                    // aa
                }
            } else if (users.length > 1) {
                // 多账号选择
                this.pType = 2;
                this.userInfo = data;
            } else {
                Toast('登录失败');
            }
        }
    }
};
</script>
