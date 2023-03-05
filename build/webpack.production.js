const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const env = process.env.NODE_ENV
const webHost = {
    dev: 'http://pgh-dev.belle.net.cn/',
    test: 'https://pgh-test.newbelle.cn/',
    pre: 'https://pgh-pre.newbelle.cn/',
    prod: 'https://pgh.belle.net.cn/'
}

module.exports = {
    mode: "production",
    output: {
        publicPath: webHost[env]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true,
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader"
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader"
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        })
    ]
}