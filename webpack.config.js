const { merge } = require('webpack-merge');

const commonConfig = require('./build/webpack.common');
const devConfig = require('./build/webpack.dev');
const proConfig = require('./build/webpack.production');

module.exports = ({ production = false }) => merge(commonConfig, production ? proConfig : devConfig)