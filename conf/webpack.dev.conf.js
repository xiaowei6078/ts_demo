/*
 * @Descripttion: 开发环境配置
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-12-23 16:08:14
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-25 16:39:55
 */

const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

const WebPackBaseConf = require('./webpack.base.conf')
const { devServer } = require('./conf')

module.exports = merge(WebPackBaseConf, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js"
    },
    // 调试工具
    devtool: 'inline-source-map',
    // 开发服务器
    devServer: {
        // contentBase: getRealPath("../dist"), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        contentBase: false,// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true,// 启用gzip压缩
        inline: true,// 设置为true，当源文件改变时会自动刷新页面
        hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
        open: true, // 自动使用我们的系统默认浏览器去打开网页
        overlay: true, // 该属性是用来在编译出错的时候，在浏览器页面上显示错误
        stats: 'errors-only', // 该属性配置是用来在编译的时候在命令行中输出的内容， 表示只打印错误
        proxy: devServer.proxy,
        host: devServer.host,// 设置默认监听域名，如果省略，默认为“localhost”
        port: devServer.port// 设置默认监听端口，如果省略，默认为“8080”
    },
    // 插件
    plugins: [
        // 热更新相关
        new webpack.HotModuleReplacementPlugin()
    ],
})
