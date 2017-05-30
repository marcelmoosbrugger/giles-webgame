/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

const Merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonConfig = require('./webpack.common.js');

const APP_DIR = path.resolve('src/app');

// The ExtractTextPlugin for the css file has to be specific
// to the prod environment, because otherwise the hot-reload
// of style files fails.
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
});

module.exports = Merge(CommonConfig, {
    module: {
        rules: [
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
    plugins: [ExtractTextPluginConfig]
});
