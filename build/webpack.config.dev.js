const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')

module.exports = {
  // 入口
  entry: './src/main.ts',
  // 输出
  output: {
    // path: path.resolve(__dirname, '../', 'dist'),
    filename: 'static/js/bundle.js'
    // 清楚上次打包内容
    // clean: true
  },
  // loader
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader'
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 插入html中
          'css-loader'
        ] // 将css编译为模块
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // 插入html中
          'css-loader', // 将css编译为模块
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 插入html中
          'css-loader', // 将css编译为模块
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader', // 插入html中
          'css-loader', // 将css编译为模块
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于10kb转为base64
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/imgs/[hash:6][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash:6][ext][query]'
        }
      },
      {
        test: /\.(mp3|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/medias/[hash:6][ext][query]'
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  // 插件
  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, '../', 'src')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../', 'index.html')
    })
  ],
  devServer: {
    port: '5000'
  },
  // 模式
  mode: 'development'
}
