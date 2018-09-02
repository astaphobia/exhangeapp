const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&overlay-false',
        process.cwd() + '/src/index.js',
    ],
    output: {
        path: process.cwd() + '/public',
        publicPath: '/',
        filename: 'main.js',
    },
    target: 'web',
    devtool: 'inline-source-map',
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
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "file-loader?name=fonts/[path][name].[ext]&context=./src"
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
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin([process.cwd() + '/public'])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/',
        port: 3000,
        host: '0.0.0.0',
        hot: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 500
        }
    },
    watchOptions: {
        poll: true,
        aggregateTimeout: 500
    }
}