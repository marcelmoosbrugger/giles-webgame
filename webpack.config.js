const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve('dist');
const APP_DIR = path.resolve('src/app');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: APP_DIR + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};
