/* 
webpack加载配置，执行constructor
webpack创建compiler对象
便利plugins，调用apply方法
出发各个hooks事件 
*/
class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options
    console.log('BannerWebpackPlugin Constructor')
  }
  apply(compiler) {
    debugger
    console.log('BannerWebpackPlugin apply')
    // emit是异步串行的钩子--资源输出之前调用
    compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, callback) => {
      // 获取将输出的资源
      // 只保留js和css资源
      const extensions = ['js', 'css']
      const assets = Object.keys(compilation.assets).filter((filepath) => {
        const splitted = filepath.split('.')
        const extension = splitted[splitted.length - 1]
        return extensions.includes(extension)
      })
      // 遍历剩下的资源添加注释
      const prefix = `
      /* 
      Author: ${this.options.author}
      */
      `
      assets.forEach((asset) => {
        const source = compilation.assets[asset].source()
        const content = prefix + source
        compilation.assets[asset] = {
          source() {
            return content
          },
          size() {
            return content.length
          }
        }
      })
      callback()
      //   console.log('BannerWebpackPlugin emit Async')
      //   setTimeout(() => {
      //     console.log('BannerWebpackPlugin emit Async callback')
      //     callback()
      //   }, 2000)
    })
  }
}

module.exports = BannerWebpackPlugin
