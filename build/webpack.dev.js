module.exports = {
    mode: "development",
    devtool: "source-map",
    target: "web",
    devServer: {
        port: 9170,
        open: true,
        compress: false,
        headers: {
            //防止跨域
            "Access-Control-Allow-Origin": "*",
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
        ],
    },
};
