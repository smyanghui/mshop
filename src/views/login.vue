<template>
    <div class="login-box" id="main_box">
        <div class="login-content">
            <div class="login">
                <h1>HanWin</h1>
                <div class="title">运营管理</div>
                <div class="full-tit">
                    后台管理系统登录
                    <a-popover>
                        <template slot="content">
                            请使用公司邮箱发送邮件至<br />hwopmsadmin@handeson.com申请账号,
                            <a href="/api/manager/mail/permission/tpl">模板下载</a>
                        </template>
                        <div style="float:right">
                            <a href="javascript:;">开通账户</a>
                        </div>
                    </a-popover>
                </div>
                <a-form :form="form" layout="horizontal" @submit="handleSubmit">
                    <a-form-item>
                        <a-input
                            placeholder="用户名"
                            v-decorator="[
                                'username',
                                {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入用户名'
                                        }
                                    ]
                                }
                            ]"
                        >
                            <a-icon type="user" slot="prefix" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                            placeholder="密码"
                            type="password"
                            v-decorator="[
                                'password',
                                {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ]
                                }
                            ]"
                        >
                            <a-icon type="lock" slot="prefix" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            :loading="loading"
                            class="btn-login"
                            >登录</a-button
                        >
                        <!-- <a-button class="register">注册</a-button> -->
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <vue-canvas-nest
            :config="{ color: '255, 255, 255', opacity: 1, count: 200 }"
            :el="'#main_box'"
        ></vue-canvas-nest>
    </div>
</template>

<script>
import apiLogin from '@/api/login';
import { App } from '@/libs';
import vueCanvasNest from 'vue-canvas-nest';

export default {
    data () {
        return {
            form: this.$form.createForm(this),
            loading: false
        };
    },

    components: { vueCanvasNest },

    mounted () {},

    methods: {
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.login({ ...values });
                }
            });
        },

        login (params) {
            const hide = this.$message.loading('正在登录', 0);

            this.loading = true;
            apiLogin.managerLogin(params).then(res => {
                this.loading = false;
                if (res.code === 0) {
                    const tokenType = res.data.token_type;
                    const accessToken = res.data.access_token;
                    const token = tokenType + ' ' + accessToken;
                    this.$cookies.set('token', token, '1m');
                    // 获取权限列表
                    this.ajaxPermission();
                } else {
                    setTimeout(hide, 0);
                    this.$message.error(res.data.msg || '登录失败');
                }
            });
        },

        ajaxPermission () {
            apiLogin.permission().then(res => {
                App.storage('permission', res.data);
                this.$message.success('登录成功', 1, () => {
                    window.location.reload();
                });
            });
        }
    },

    watch: {}
};
</script>

<style lang="less" scpoed>
.login-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/image/login_bg.jpg") no-repeat center center;
    background-size: cover;
}
.login-content {
    padding: 20px 60px;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.login {
    width: 500px;
    padding-bottom: 1px;
    .title {
        font-size: 20px;
        margin-top: 0px;
    }
    .full-tit {
        font-size: 16px;
        color: #999;
        margin-bottom: 30px;
    }
    .btn-login {
        width: 100%;
        font-size: 16px;
        height: 44px;
    }
    h1 {
        font-size: 44px;
        margin-bottom: 5px;
        font-family: "Microsoft YaHei";
        font-weight: 700;
        letter-spacing: 0px;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        animation: rainbow 10s ease-in-out 0s infinite;
        border: none;
        outline: none;
    }
    .register {
        font-size: 16px;
        height: 44px;
        margin-left: 10px;
        width: 90px;
    }
    input {
        font-size: 16px;
        border-radius: 4px;
        height: 44px;
    }
    button {
        border-radius: 0;
    }
    .bar-code {
        cursor: pointer;
        margin-left: 0px;
    }
}

@keyframes rainbow {
    0% {
        background-color: #ff6b64;
    }
    20% {
        background-color: #c16b8a;
    }

    40% {
        background-color: #87c3da;
    }
    60% {
        background-color: #cbdc5d;
    }
    80% {
        background-color: #fddd6c;
    }
    100% {
        background-color: #ff6b64;
    }
}
.rainbow {
    background: black;
    animation: rainbow 10s ease-in-out 0s infinite;
}
</style>
