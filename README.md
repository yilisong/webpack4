#webpack 4  0~1


<h2>以下操作默认相关环境以及安装好</h2>

* [1 安装前提](#1-安装)
  * [1.1 安装前提](#11-安装前提)
  * [1.2 安装webpack](#12-安装webpack)
  * [1.3 创建项目主文件夹](#13-创建项目主文件夹)
  * [1.4 命令生成package.json文件](#14-命令生成package.json文件)
  * [1.5 创建测试文件](#15-创建测试文件)
  * [1.6 初版测试](#16-初版测试)
  * [1.7 初涉配置文件](#17-初涉配置文件)
* [2 常规配置](#2-常规配置)
  * [2.1 js打包](#21-安装前提)
  * [2.2 html打包](#22-html打包)
  * [2.3 css图片处理](#23-css图片处理) 

## 1 安装

### 1.1 安装前提
```javascript
  环境  node v8.6.0
       npm  v6.2.0
```

### 1.2 安装 webpack webpack-cli webpack-dev-server
```javascript
  首先先安装webpack  webpack-cli webpack-dev-server 安装命令如下：
    npm install webpack webpack-cli webpack-dev-server -g
  ⚠ mac下面安装输入  sodu npm install webpack webpack-cli webpack-dev-server -g  回车后需要输入开机密码，直接输入就行
```

### 1.3 创建文件夹
```javascript
  Linux命令  1.mkdir 【name】 创建名称为name文件夹
            2.touch【name】 创建名称为name文件
  输入命令mkdir config dist src创建三个文件夹
```

### 1.4 生成package.json文件
```javascript
  输入命令npm init -y
```

### 1.5 创建测试文件
```javascript
  输入命令touch dist/index.html src/index.js 分别dist和src文件夹下面创建一个index.html文件和index.js文件
```

### 1.6 初版测试
```javascript
  直接命令行输入 webpack  可打包成功 但是会有警告 
  WARNING in configuration  The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
  原因：mode是webpack中独有的，有两种打包环境，一个是开发环境：development另外一个是生产环境：production
  操作： 开发环境  webpack --mode=development
        生产环境  webpack --mode=production （打完包之后文件要比开发环境的小很多）
```

### 1.7 初涉配置文件
```javascript
  创建配置文件： 命令 touch config/webpack.dev.js
  删除之前测试打包文件夹： 命令  rm dist  （了解rm和 rm -rf)
  在配置文件 webpack.dev.js 内编写配置信息： 
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
    在package.json文件中的 scripts 下增加打包指令 如下
    ...
    "scripts": {
      "dev": "webpack  --mode development --config=config/webpack.dev.js",
      "build": "webpack  --mode production --config=config/webpack.dev.js"
    },
    ...
```

## 2 常规配置

### 2.1 js打包
```javascript
在webpack.dev.js中引入
  ⚠️ ‘uglifyjs-webpack-plugin’ 该插件webpack已经集成了，一般不需要安装，如果出现缺少该文件错误，单独安装下试试
    安装命令 ‘npm install uglifyjs-webpack-plugin --save’
  const uglify = require('uglifyjs-webpack-plugin');

  ...
  plugins: [
    new uglify() // js压缩
  ],
  ...
```

### 2.2 html打包
```javascript
 安装‘html-webpack-plugin’插件  命令:'npm install html-webpack-plugin --save-dev'
在webpack.dev.js中引入
  const htmlPlugin = require('html-webpack-plugin')

  ...
  plugins: [
    ...
    new htmlPlugin({
      minify: { //是对html文件进行压缩
        removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
      },
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: './src/index.html' //是要打包的html模版路径和文件名称。
    }),
    ...
  ],
  ...
```

### 2.3 css图片处理打包
```javascript
安装图片引用路径插件 'npm install --save-dev file-loader url-loader'
file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，
因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。
这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，
再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，
生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。
当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，
大于limit的还会使用file-loader进行copy。
  在webpack.dev.js内配置
  module: {
    rules: [
      ...
      {
        test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
        use:[{
            loader:'url-loader', //是指定使用的loader和loader的配置参数
            options:{
                limit:500  //是把小于500B的文件打成Base64的格式，写入JS
            }
        }]
      }
      ...
```