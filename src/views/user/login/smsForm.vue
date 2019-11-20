<template>

    <div class="sms_box">

        <div class='input_line'>
            <div class='i_icon'>
                <span class="icon-hw_shoujihao01"></span>
            </div>

            <div class='input_box'>
                <input
                    type="number"
                    placeholder='请输入手机号码'
                    v-model="mobileNum"
                    oninput="if(value.length>11)value=value.slice(0,11)"
                />
            </div>

            <div>
                <mt-button
                    :disabled="isDisabled"
                    size="small"
                    type="danger"
                    @click="ajaxMsgCode"
                >
                    {{acount > 0 ? `${acount}秒` : '获取验证码'}}
                </mt-button>
            </div>

        </div>

        <div class='input_line'>
            <div class='i_icon'>
                <span class="icon-hw_duanxin01"></span>
            </div>

            <div class='input_box'>
                <input
                    placeholder='请输入短信验证码'
                    v-model="yzmNum"
                    oninput="if(value.length>6)value=value.slice(0,6)"
                />
            </div>

        </div>

        <mt-button type="danger" size='large' @click="ajaxSmsLogin">登录</mt-button>

        <p class="dectext">首次登录自动注册</p>

        <div class="agree" @click="agreement">
            <p class="a_icon">
                <span class="icon-hw_xuanzhong" :class="agreeClass"></span>
            </p>
            <p class="a_text">
                我已阅读并同意<a href="">《汉薇用户协议及隐私政策》</a>
            </p>
        </div>

    </div>

</template>

<script>
import { Toast } from 'mint-ui';
import loginApi from '@/api/login';

import './smsForm.less';

// 校验手机号码
function checkMobile (mobile) {
    return /^1\d{10}$/.test(mobile);
};

export default {
    data () {
        return {
            mobileNum: '',
            yzmNum: '',
            agree: true,
            acount: 0 // 倒计时
        };
    },

    computed: {
        // 获取短信按钮是否禁用
        isDisabled: function () {
            const isMobile = checkMobile(this.mobileNum);

            return this.acount > 0 || !isMobile;
        },
        agreeClass: function () {
            return this.agree ? 'yes' : 'no';
        }
    },

    components: {},

    methods: {

        // 倒计时
        countDown () {
            let count = 60;
            let f = () => {
                --count;
                this.acount = count;
                if (count > 0) {
                    setTimeout(f, 1000);
                }
            };

            f();
        },

        // 获取短信验证码
        ajaxMsgCode () {
            const phone = this.mobileNum;
            const isMobile = checkMobile(phone);

            // 判断是否可点击
            if (!isMobile || this.acount > 0) {
                return false;
            }

            const param = { phone, scene: 'register_login' };

            loginApi.getMsgCode(param).then(res => {
                console.log(res);
                if (res.code === 0) {
                    Toast('发送成功');
                    this.countDown(); // 倒计时
                } else {
                    Toast(res.msg);
                }
            });
        },

        // 手机短信登录
        ajaxSmsLogin () {
            const phone = this.mobileNum;
            const code = this.yzmNum;
            const isMobile = checkMobile(phone);

            if (!isMobile) {
                Toast('请输入正确的手机号码');
                return false;
            }
            if (code.length < 6) {
                Toast('验证码有误，请重新输入');
                return false;
            }
            if (!this.agree) {
                Toast('请勾选汉薇用户协议');
                return false;
            }
            const param = {
                phone,
                sms_code: code
                // mp_code: login.code,
            };

            loginApi.smsLogin(param).then(res => {
                if (res.code === 0) {
                    let resData = res.data;

                    this.$emit('subLoginCheck', resData);
                } else {
                    Toast(res.msg);
                }
            });
        },

        // 勾选协议
        agreement () {
            const oagree = this.agree;

            this.agree = !oagree;
        }

    }
};
</script>
