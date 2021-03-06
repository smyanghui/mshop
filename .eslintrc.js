module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'semi': ['error', 'always'], // 分号结尾
        'quotes': [1, 'single'], // 强制单引号
        'indent': ['error', 4, { 'SwitchCase': 1 }], // 4空格缩进
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
