const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    VueLoaderPlugin
} = require("vue-loader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const {
    DefinePlugin
} = require("webpack");


const packageName = require("../package.json").name;
const projectConfig = require("../project.config");

const rooPath = __dirname + "/../";

const config = {
    entry: rooPath + "src/main",
    output: {
        path: path.resolve(rooPath, "dist"),
        filename: "[name].bundle.[hash].js"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                exclude: /node_modules/,
                use: ["vue-loader"],
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    runtimeCompat: true
                }
            },
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }, ],
            },
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                type: "asset",
                generator: {
                    filename: "images/[name][ext]",
                },
            },
            {
                test: /\.(ttf|otf|woff|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".vue", ".mjs"],
        fallback: {
            buffer: false
        },
        alias: {
            "@": path.resolve("src"),
        },
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "PGH系统",
            template: path.resolve(__dirname, "../template.html"),
            filename: `index.html`,
            chunks: "index",
            inject: false,
        }),
        new DefinePlugin({
            APP_CONFIG: JSON.stringify(projectConfig),
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        }),
    ],
    performance: {
        hints: false,
    },
};

module.exports = config;