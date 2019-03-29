const path = require('path')
module.exports = {
  module: 'development',
  /**
   * 文件入口配置项
   * 一个直接写main: 'xxxxx'
   * 多个  main1: 'xxxx',
   *       main2: 'xxxxx'
   *  */ 
  entry: {
    main: './src/main.js'
  },
  // 文件出口配置项
  output: {
    // 打包的目录
    path: path.resolve(__dirname, '../dist'),
    /**
     * 打包的文件名称  
     * 1、单个入口 可直接写死 例如： build.js
     * 2、多个入口 须写成数组类型  例如： [name].js 输出的是按照原文件名
     *  */ 
    filename: '[name].js'
  },
  // 各个模块  例如css、js、image……
  module: {},
  // 插件，用于生产模板和各项功能
  plugins: [],
  // 配置webpack开发服务功能
  devServer: {}
}