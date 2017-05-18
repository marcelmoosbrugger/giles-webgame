/*
 * This file is part of Gile's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

const Merge = require('webpack-merge');
const path = require('path');
const CommonConfig = require('./webpack.common.js');

const APP_DIR = path.resolve('src/app');

module.exports = Merge(CommonConfig, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: APP_DIR,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
});
