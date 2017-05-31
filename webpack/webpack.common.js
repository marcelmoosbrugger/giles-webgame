/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve('dist');
const BUILD_DIR = path.resolve('build');
const APP_DIR = path.resolve('src/app');
const SRC_DIR = path.resolve('src');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: APP_DIR + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            APP_DIR + '/index.jsx'
        ]
    },
    output: {
        path: DIST_DIR,
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
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                include: SRC_DIR,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            Styles: APP_DIR + '/style',
            Purs: BUILD_DIR + '/purs'
        }
    },
    plugins: [HtmlWebpackPluginConfig]
};
