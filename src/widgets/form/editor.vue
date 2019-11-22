<template>
    <!-- 使用实列
    <hm-form-item label="活动规则" >
        <Editor
            placeHolder="请输入活动规则"
            v-decorator="['werwer', {
                initialValue: '',
                rules: [{
                    required: true,
                    message: '请输入活动规则'
                }]
            }]"
        >
        </Editor>
    </hm-form-item> -->
    <div class="editor-component">
        <quill-editor ref="myTextEditor"
            v-model="content"
            class="ql-editor"
            :options="editorOption">
        </quill-editor>
        <input type="file" :id="id" style="display: none" @change="upload"/>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import hljs from 'highlight.js';
import ajax from '@/libs/r';
import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import QUpload from '@/libs/q-upload';
Vue.use(VueQuillEditor);

let toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'font': []}],
    [{'color': []}, {'background': []}],
    [{'align': []}],
    ['clean'],
    ['link', 'image', 'video']
];

function randomString (len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz_';
    let pwd = '';
    let maxPos = $chars.length;

    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

let id = 'upload_' + randomString(10) + new Date().getTime();

export default {
    props: {
        value: [Object, Array, String],
        placeHolder: {
            type: [Object, String, Number],
            default: null
        }
    },
    data () {
        return {
            id,
            name: '01-example',
            content: this.value || '',
            editorOption: {
                theme: 'snow',
                placeholder: this.placeHolder || '请输入',
                modules: {
                    toolbar: {
                        container: toolbar,
                        handlers: {
                            'image': function (value) {
                                if (value) {
                                    document.querySelector('#' + id).click();
                                }
                            }
                        }
                    },
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            }
        };
    },
    watch: {
        content (value) {
            this.$emit('change', value);
        },
        value (v) {
            this.content = v;
        }
    },
    methods: {
        setDetaultDetail (detail) {
            this.content = detail;
        },

        getPreviewSrc (params) {
            // 获取图片服务端展示地址
            return new Promise((resolve, reject) => {
                ajax.post('/upload/get-url', {...params}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        upload (e) {
            let qu = new QUpload(this.$userInfo.buckets[1]);

            qu.upload(e.target.files[0]).then(res => {
                this.getPreviewSrc({key: res.key, bucket: this.$userInfo.buckets[1]}).then(res => {
                    this.handleSuccess(res.data.original);
                });
            });
        },

        handleSuccess (imgUrl) {
            // 获取富文本组件实例
            let quill = this.$refs.myTextEditor.quill;
            // 如果上传成功

            if (imgUrl) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片，imgUrl为服务器返回的图片链接地址

                quill.insertEmbed(length, 'image', imgUrl);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                // 提示信息，需引入Message
                this.$message.warning('图片插入失败');
            }
        }
    },
    computed: {
        editor () {
            return this.$refs.myTextEditor.quill;
        },
        contentCode () {
            return hljs.highlightAuto(this.content).value;
        }
    },
    mounted () {
        // console.log(this.defaultData.detail, ' this.defaultData.detail');
        // console.log('this is my editor', this.editor);
    }
};
</script>

<style lang='less'>
    .editor-component{
        .ql-container{
            &.ql-snow{
                min-height: 100px;
            }
        }
    }
</style>