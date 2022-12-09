const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FilemanWebpackPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/i,
                type: "asset/inline"
            },
            {
                test: /.svg$/,
                type: "asset/resource",
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]')
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new FilemanWebpackPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000
    }
};
