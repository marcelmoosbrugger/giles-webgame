const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve('dist');
const APP_DIR = path.resolve('src/app');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: APP_DIR + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
});

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            APP_DIR + '/index.jsx'
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: APP_DIR,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
};
