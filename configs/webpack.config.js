const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: process.cwd() + '/public',
        publicPath: './',
        filename: 'main.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
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
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/',
        port: 9000,
        hot: true,
        inline: true
    }
}