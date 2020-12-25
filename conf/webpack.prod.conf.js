/*
 * @Descripttion: 生产环境配置
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-12-23 16:08:31
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-25 15:34:39
 */
const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
// 通过clean-webpack-plugin插件删除输出目录中之前旧的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 配置自定义html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css提取到单独的文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 进行js文件的压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// css 压缩 会清除css中注释
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const BaseWebpackConf = require('./webpack.base.conf')
// 获取路劲
const getRealPath = (url) => path.join(__dirname, url)

module.exports = merge(BaseWebpackConf, {
    mode: 'production',
    // 调试工具
    devtool: '#source-map',
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出目录
        filename: "js/[name].[chunkhash].js", // name为entry对象中的app key，即为name==='app'
        publicPath: './'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // 导出 css
            filename: 'styles/[name].[hash:5].css',
            chunkFilename: 'styles/[id].[hash:5].css'
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    drop_debugger: false,
                    drop_console: true
                }
            }
        }),
        new OptimizeCSSAssetsPlugin({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.(sa|sc|c)ss$/g,
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: { removeAll: true }, // 对注释的处理
                    normallizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                }]
            },
            canPrint: true // 是否打印编译过程中的日志
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件命名
            template: getRealPath('../public/index.html'), // 模板文件。或者写路劲为"./public/index.html"
            // inject 有4个选项，按最新标准，一般将js文件置于body底部
            // true 默认值，script标签位于html文件的 body 底部
            // body script标签位于html文件的 body 底部
            // head script标签位于html文件的 head中
            // false 不插入生成的js文件，这个几乎不会用到的
            inject: true,
            title: 'demo',
            favicon: './public/favicon.ico',
            // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
            // ex: html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
            hash: true,
            // 压缩html
            minify: {
                // 移除注释
                removeComments: true,
                // 删除双引号
                removeAttributeQuotes: true,
                // 压缩成一行 不要留下任何空格
                collapseWhitespace: true,
                // 当值匹配默认值时删除属性
                removeRedundantAttributes: true,
                // 使用短的doctype替代doctype
                useShortDoctype: true,
                // 移除空属性
                removeEmptyAttributes: true,
                // 从style和link标签中删除type="text/css"
                removeStyleLinkTypeAttributes: true,
                // 保留单例元素的末尾斜杠。
                keepClosingSlash: true,
                // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyJS: true,
                // 缩小CSS样式元素和样式属性
                minifyCSS: true,
                // 在各种属性中缩小url
                minifyURLs: true
            }
        })
    ],
    // 代码分离相关
    optimization: {
        // nodeEnv: config.mode,
        minimizer: [],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                }
            }
        }
    }
})

