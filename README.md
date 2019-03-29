#webpack 4  0~1

```html
<h2>以下操作默认相关环境以及安装好</h2>
```
* [1 安装前提](#1-安装)
  * [1.1 安装前提](#11-安装前提)
  * [1.2 安装webpack](#12-安装webpack)
  * [1.3 创建项目主文件夹](#13-创建项目主文件夹)
  * [1.4 命令生成package.json文件](#14-命令生成package.json文件)
  * [1.5 创建测试文件](#15-创建测试文件)
  * [1.6 初版测试](#16-初版测试)
  * [1.7 初涉配置文件](#17-初涉配置文件)

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