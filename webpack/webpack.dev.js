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
