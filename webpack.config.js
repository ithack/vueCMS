const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引包：删除（旧的打包文件）dist目录
const CleanWebpackPlugin = require("clean-webpack-plugin");
let isDev= process.env.NODE_ENV=='development'?'dev':'pro';
module.exports = {
  entry: {
    build: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  },
  output: {
    path: path.resolve( './dist'),
    filename: '[name].js',
    chunkFilename: 'chunk[id].js?[chunkhash]',
    publicPath: isDev=='dev' ? '/' : '//www.baidu.com/easy/dist/'+config.version+'/'//组件懒加载配置，生产环境不在当前域下访问
  },
  externals: {
    jquery: 'window.$'
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
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vue','vuex','vuedraggable','mint-ui','element-ui','axios'], // 用于提取manifest
      filename:'vendor.js'
    }),
    new CleanWebpackPlugin(isDev!='dev'?path.resolve( './dist/',config.version):''),//build命令清空dist下配置的当前版本文件
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
        loader: 'url-loader?limit=8192&name=[name].[ext]?[hash]',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],//省略掉后缀名，写成 import child from './child'
    alias: {
      '~':path.resolve(__dirname, "./src")
    }
  }
}
