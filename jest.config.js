/*
 * @Descripttion: 测试配置
 * @version: 1.0
 * @Author: Ray Huang
 * @Date: 2020-12-25 17:53:33
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-25 17:55:56
 */
module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
