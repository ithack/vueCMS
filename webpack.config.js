const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vuxLoader = require('vux-loader')
module.exports = {
  entry: {
    build: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
    vendor: ['vue', 'vuedraggable', 'jquery', 'axios']
  },
  output: {
    path: path.resolve( './dist'),
    filename: '[name].js'
  },
  externals: {
    jQuery: '$'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    inline: true
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
        loader: ['vue-style-loader', 'css-loader']
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
    extensions: ['.js', '.vue']
  }
}
