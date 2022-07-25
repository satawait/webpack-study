const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const threads = os.cpus().length
const getStyleLoader = (pre) => {
  return [
    MiniCssExtractPlugin.loader, // 插入html中
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'] // 解决兼容问题
        }
      }
    },
    pre
  ].filter(Boolean)
}
module.exports = {
  entry: './src/main.ts',
  output: {
    path: undefined,
    file: 'static/js/[name].js',
    chunkFilename: 'static/js/[name]/chunk.js'
  },
  resolve: {
    alias: {},
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  works: threads
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false // 关闭缓存文件压缩
                }
              },
              {
                loader: 'ts-loader',
                options: {
                  happyPackMode: true,
                  transpileOnly: true
                }
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: getStyleLoader() // 将css编译为模块
          },
          {
            test: /\.less$/,
            use: getStyleLoader('less-loader')
          },
          {
            test: /\.scss$/,
            use: getStyleLoader('sass-loader')
          },
          {
            test: /\.styl$/,
            use: getStyleLoader('stylus-loader')
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
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  works: threads
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false // 关闭缓存文件压缩
                }
              }
            ],
            exclude: /node_modules/
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, '../', 'src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '..', 'node_modules/.cache/eslintcache'),
      threads
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../', 'index.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`
    }
  },
  devServer: {
    port: '5000',
    hot: true // 默认开启的热更新
  },
  // 模式
  mode: 'development',
  devtool: 'cheap-module-source-map'
}
