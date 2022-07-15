const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer:{
        contentBase: "./public",
        port: 8080
    },
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                cache:true,
                parallel:true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/, // pega somente arquivos sass ou scss
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader', // interpreta @import , url() ...
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: ['file-loader']
            }
        ]
    }
}