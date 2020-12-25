/*
 * @Descripttion: 开发环境和生产环境的共有配置
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-12-23 15:09:28
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-25 16:49:37
 */
const path = require('path')
// 配置自定义html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css提取到单独的文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpack = require('webpack')
// 获取路劲
const getRealPath = (url) => path.join(__dirname, url)

const { mode } = require('./conf')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
    entry: {
        app: getRealPath('../main.js') // 需要打包的文件。或者'./main.js'
    },
    // 解析
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    devMode ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    } : 'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            },
                            sourceMap: true
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: getRealPath('../src/assets/styles/index.scss')
                        }
                    }
                ]
            },
            {
                test: /\.ts(x)?$/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // 不包括node_modules
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime'] // 避免重复引入   npm install --save-dev @babel/plugin-transform-runtime 和@babel/runtime生产相关性（因为它是针对“运行时”的）  npm install --save @babel/runtime
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-withimg-loader'] // img标签src加载图片的话,图片会被打包
            },
            {
                test: /\.(gif|png|jpg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000, //图片小于10kb就是图片地址，大于正常打包成base64格式编码
                            name: 'images/[name].[hash].[ext]'// 加上.[hash],防止各目录中出现相同文件名图片，如果不使用[hash]，在汇总到images目录中后，图片会被替换
                            // output: 'images/' //输出路径
                        }
                    }
                ]
            },
            {
                test: /\.(tff|eot|woff|woff2?|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "fonts/[name]-[hash:5].[ext]",
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        }
                    }
                ]
            }
        ]
    },
    // 目标运行环境
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件命名
            title: 'demo',
            favicon: './public/favicon.ico',
            template: getRealPath('../public/index.html') // 模板文件。或者写路劲为"./public/index.html"
        }),
        // 这个插件是用来定义全局变量的
        new webpack.DefinePlugin({
            'MODE': mode
        })
    ]
}
