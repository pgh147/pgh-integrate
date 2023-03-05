module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage", // 按需引入 polyfill
                corejs: 3,
                targets: {
                    node: "current",
                },
            },
        ],
        [
            "@babel/preset-typescript", // 引用Typescript插件
            {
                allExtensions: true, // 支持所有文件扩展名，否则在vue文件中使用ts会报错
            },
        ],
    ],
    plugins: [
        "@babel/plugin-proposal-optional-chaining",
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: 3,
            },
        ],
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
    ],
    env: {
        development: {
            // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
            // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
            // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
            plugins: ["dynamic-import-node"],
        },
    },
};
