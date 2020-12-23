/*
 * @Descripttion: 开发环境配置
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-12-23 16:08:14
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-23 16:24:03
 */

const path = require('path')

const config = {
    devServer: {
        contentBase: getRealPath("../dist"), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        colors: true, // 在cmd终端中输出彩色日志
        historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //设置为true，当源文件改变时会自动刷新页面
        port: 8080, //设置默认监听端口，如果省略，默认为"8080"
        process: true //显示合并代码进度
    }
}