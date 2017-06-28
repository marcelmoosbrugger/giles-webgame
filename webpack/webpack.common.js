/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve('dist');
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
            APP_DIR + '/index.jsx'
        ],
        oldbrowser: APP_DIR + '/oldbrowser.js'
    },
    output: {
        path: DIST_DIR,
        filename: '[name].bundle.js'
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
            },
            {
                test: /\.purs$/,
                loader: 'purs-loader',
                exclude: /node_modules/,
                query: {
                    psc: 'psa',
                    src: ['bower_components/purescript-*/src/**/*.purs', SRC_DIR + '/**/*.purs'],
                    warnings: false
                }
            }
        ]
    },
    resolve: {
        alias: {
            Containers: APP_DIR + '/components/containers',
            Presentationals: APP_DIR + '/components/presentationals',
            Styles: APP_DIR + '/style',
            Purs: APP_DIR + '/purs',
            Actions: APP_DIR + '/state/actions',
            Validation: APP_DIR + '/validation',
            Abstracts: APP_DIR + '/components/abstracts'
        }
    },
    plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
};
