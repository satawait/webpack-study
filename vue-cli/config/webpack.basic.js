const path = require('path')
const os = require('os')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const threads = os.cpus().length
const isProduction = process.env.NODE_ENV === 'production'
const getStyleLoader = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader', // 插入html中
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
  entry: './src/main.ts',
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
    extensions: ['.vue', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
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
              appendTsSuffixTo: [/\.vue$/],
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  // 插件
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new VueLoaderPlugin(),
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
      AutoImport({
        imports: [
          'vue',
          'vue-router'
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
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
        vue: {
          test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
          name: 'chunk-vue',
          priority: 40
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
