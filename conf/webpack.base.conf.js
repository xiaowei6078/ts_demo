/*
 * @Descripttion: 开发环境和生产环境的共有配置
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-12-23 15:09:28
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-23 18:12:14
 */
const path = require('path')

// 通过clean-webpack-plugin插件删除输出目录中之前旧的文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 配置自定义html模板
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 将css提取到单独的文件中
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 获取路劲
const getRealPath = (url) => path.join(__dirname, url)

module.exports = {
    mode: 'development',
    entry: {
        app: getRealPath('../main.js') // 需要打包的文件。或者'./main.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js', // name为entry对象中的app key，即为name==='app'
        path: path.resolve(__dirname, '../dist') // 输出目录
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件命名
            template: getRealPath('../public/index.html'), // 模板文件。或者写路劲为"./public/index.html"
            // true: 所有JavaScript资源插入到body元素的底部;
            // false: 所有静态资源css和JavaScript都不会注入到模板文件中,一般需要自定义模板配置的时候使用;
            // 'head': 所有JavaScript资源插入到head元素中
            inject: true,
            title: 'demo',
            favicon: './public/favicon.ico',
            // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
            // ex: html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
            hash: true,
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true // 压缩成一行
            }
        }),
        // 提取css到style.css中
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader', // 补全css代码的兼容性前缀,
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            },
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
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
                test: /\.js$/,
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
                            output: 'images/' //输出路径
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
    }
}
