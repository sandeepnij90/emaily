const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new extractTextPlugin({
    filename: 'index.css'
});
const htmlPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        proxy : {
            '/auth/google': {
                target: 'http://localhost:5000'
            },
            '/api/*' : {
                target: 'http://localhost:5000'
            }
        }
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/preset-env', '@babel/preset-react']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use:['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }]
            }
        ]
    }, plugins: [
        extractPlugin,
        new htmlPlugin({
            template: 'src/index.html'
        }),
        new dotEnv({
            safe: false,
            path:'./.env'
        })
    ]
}