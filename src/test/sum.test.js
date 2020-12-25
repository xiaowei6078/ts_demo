/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Ray Huang
 * @Date: 2020-12-25 17:43:21
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-12-25 17:44:55
 */

const { fn } = require('./test')
test('adds 1 + 2 to equal 3', () => {
    expect(fn(1, 2)).toBe(3)
})