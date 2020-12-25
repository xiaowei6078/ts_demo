/*
 * @Descripttion: 配置
 * @version: 1.0
 * @Author: Ray Huang
 * @Date: 2020-12-25 15:14:22
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-25 16:42:21
 */

module.exports = {
    // 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
    ASSET_PATH: process.env.ASSET_PATH || '/',
    mode: `"${process.env.NODE_ENV}"`, // 环境变量
    devServer: { // 实现跨域
        host: '127.0.0.1',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://news.baidu.com', // 目标接口的域名
                // secure: true,  // https 的时候 使用该参数
                changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/api': ''  // 重写路径, 把url的地址里面含有 '/api' 这样的 替换成 ''
                }
            }
        }
    }
}