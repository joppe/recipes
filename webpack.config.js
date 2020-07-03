/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const path = require('path');

const config = {
    devServer: {
        open: true,
        port: 9000,
    },

    devtool: 'source-map',

    entry: ['./src/main.tsx'],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/assets/',
    },
};

module.exports = config;
