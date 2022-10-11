module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname + '/src',
        project: ['../tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        "plugin:eslint-comments/recommended",
        "prettier"
    ],
    rules: {
        "eslint-comments/disable-enable-pair": ["error", {"allowWholeFile": true}],
        "eslint-comments/no-aggregating-enable": "error",
        "eslint-comments/no-duplicate-disable": "error",
        "eslint-comments/no-unlimited-disable": "error",
    },

};