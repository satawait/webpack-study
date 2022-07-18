const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口
    entry: './src/main.ts',
    // 输出
    output: {
        path: path.resolve(__dirname, '../', 'dist'),
        filename: 'bundle.js'
    },
    // loader
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'babel-loader'
                }, 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', // 插入html中
                'css-loader'] // 将css编译为模块
            },
            {
                test: /\.less$/,
                use: ['style-loader', // 插入html中
                'css-loader', // 将css编译为模块
                'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', // 插入html中
                'css-loader', // 将css编译为模块
                'sass-loader']
            },
            {
                test: /\.styl$/,
                use: ['style-loader', // 插入html中
                'css-loader', // 将css编译为模块
                'stylus-loader']
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于10kb转为base64
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    // 插件
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        })
    ],
    // 模式
    mode: 'development'
}