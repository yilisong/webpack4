const path = require('path')
const uglify = require('uglifyjs-webpack-plugin') // js压缩 
const htmlPlugin = require('html-webpack-plugin') // html打包
const extractTextPlugin = require('extract-text-webpack-plugin') // css分离和图片路径处理

const website ={
  publicPath:"http://localhost:8080/"
  // publicPath:"http://192.168.1.1:8888/"
}// 这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。

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
    filename: '[name].js',
    publicPath: website.publicPath  //publicPath：主要作用就是处理静态文件路径的。
  },
  // 各个模块  例如css、js、image……
  module: {
    rules: [
      // css loader
      {
        test:/\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use:[
            { loader: "css-loader"}
          ]
        })
      },
      //less loader
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [{
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      //sass loader
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      // 是匹配图片文件后缀名称
      {
        test:/\.(png|jpg|gif|jpeg)/,
        use:[{
            loader:'url-loader', //是指定使用的loader和loader的配置参数
            options:{
              limit:5000, //是把小于5000B的文件打成Base64的格式，写入JS
              outputPath:'images/' //打包后的图片放到images文件夹下
            }
        }]
      },
      // HTML中图片处理
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader'] 
      }
    ]
  },
  // 插件，用于生产模板和各项功能
  plugins: [
    new uglify(), // js压缩
    new htmlPlugin({
      minify: { //是对html文件进行压缩
        removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
      },
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: './src/index.html' //是要打包的html模版路径和文件名称。
    }),
    new extractTextPlugin("style/index.css")  //这里的/css/index.css 是分离后的路径
  ],
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