const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const threads = os.cpus().length
const isProduction = process.env.NODE_ENV === 'production'
const getStyleLoader = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // 插入html中
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'] // 解决兼容问题
        }
      }
    },
    pre && {
      loader: pre,
      options:
        pre === 'less-loader'
          ? {
              // antd 自定义主题色
              lessOptions: {
                modifyVars: { '@primary-color': '#1DA57A' },
                javascriptEnabled: true
              }
            }
          : {}
    }
  ].filter(Boolean)
}
module.exports = {
  entry: './src/main.tsx',
  output: {
    path: isProduction ? path.resolve(__dirname, '..', 'dist') : undefined,
    filename: isProduction ? 'static/js/[name].[contenthash:6].js' : 'static/js/[name].js',
    chunkFilename: isProduction
      ? 'static/js/[name].[contenthash:6].chunk.js'
      : 'static/js/[name]/chunk.js',
    clean: true
  },
  resolve: {
    alias: {},
    extensions: ['.tsx', '.jsx', '.ts', '.js']
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
                  plugins: [!isProduction && 'react-refresh/babel'].filter(Boolean),
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
                  plugins: [!isProduction && 'react-refresh/babel'].filter(Boolean),
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
      template: path.resolve(__dirname, '../public', 'index.html')
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:6].css',
        chunkFilename: 'static/css/[name].[contenthash:6].chunk.css'
      }),
    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist'),
            globOptions: {
              ignore: ['**/index.html']
            }
          }
        ]
      }),
    !isProduction && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  optimization: {
    usedExports: true,
    providedExports: true,
    sideEffects: true,
    minimize: isProduction,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: threads
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: 'chunk-react',
          priority: 40
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'chunk-antd',
          priority: 30
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-lib',
          priority: 20
        }
      }
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`
    }
  },
  devServer: {
    port: '5000',
    historyApiFallback: true, // 路由404问题
    hot: true // 默认开启的热更新
  },
  // 模式
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map'
}
