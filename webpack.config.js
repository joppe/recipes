import { path } from 'path';

export const config = {
    devServer: {
        open: true,
        port: 9000,
    },

    devtool: 'source-map',

    entry: ['./src/main.tsx'],

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                loader: 'source-map-loader',
                test: /\.js$/,
            },
        ],
    },

    resolve: {
        alias: {
            '@recipe': path.resolve(__dirname, 'src/recipe'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/assets/',
    },
};
