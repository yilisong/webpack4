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
  module: {
    rules: [
      // css loader
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueLoaderConfig
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('media/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      //   }
      // }
    ]
  },
  // 插件，用于生产模板和各项功能
  plugins: [],
  // 配置webpack开发服务功能
  devServer: {
    // 设置基本目录结构
    contentBase: path.resolve(__dirname, '../dist'),
    // 服务器的基本信息 IP地址 127.0.0.1 用localhost也行
    host: 'localhost',
    // 服务端压缩是否开启
    compress: true,
    // 端口号
    port: '8080'
  }
}