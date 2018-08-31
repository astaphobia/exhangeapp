const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: process.cwd() + '/public',
        publicPath: './',
        filename: 'main.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: {
            '@': process.cwd() + '/src'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico)$/,
                use: {
                    loader: "file-loader?name=img/[path][name].[ext]&context=./src"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/',
        port: 9000,
        hot: true,
        inline: true
    }
}