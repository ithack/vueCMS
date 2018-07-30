const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引包：删除（旧的打包文件）dist目录
const CleanWebpackPlugin = require("clean-webpack-plugin");
var config = require('./config.json');
let isDev= process.env.NODE_ENV=='development' || process.env.NODE_ENV=='prefat'?'dev':'pro';
let proPlugins=[]
if(isDev!='dev'){
  proPlugins.push(
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new CleanWebpackPlugin(path.resolve( './dist/',config.version))//build命令清空dist下配置的当前版本文件
  )
}
module.exports = {
  entry: {
    build: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  },
  output: {
    path: path.resolve( './dist/',config.version),
    filename: '[name].js',
    chunkFilename: 'chunk[id].js?[chunkhash]',
    publicPath: process.env.NODE_ENV=='development' ? '/' : '//common./easy/dist/'+config.version+'/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    disableHostCheck: true,
    inline: true,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vue','vuex','vuedraggable','mint-ui','element-ui','axios'], // 用于提取manifest
      filename:'vendor.js'
    }),

    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/tpl/index.html',
      title: 'cmsx',
      appMountId: 'app',
      chunksSortMode: function (chunk1, chunk2) {
        var order = ['vendor', 'build'];
        var order1 = order.indexOf(chunk1.names[0])
        var order2 = order.indexOf(chunk2.names[0])
        return order1 - order2
      },
      minify: { //打包后压缩
        removeComments: true, // 打包后删除注释
        collapseWhitespace: true // 打包后删除空格
      },
      mobile: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    ...proPlugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('postcss-cssnext')()]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'style-loader',
          'css-loader',
          'less-loader']
      },
      {
        // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        // 如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=[name].[ext]?[hash]&publicPath=//common./easy/dist/0.0.1',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~':path.resolve(__dirname, "./src")
    }
  }
}
