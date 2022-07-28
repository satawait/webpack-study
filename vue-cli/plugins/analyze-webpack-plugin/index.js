/* 
webpack加载配置，执行constructor
webpack创建compiler对象
便利plugins，调用apply方法
出发各个hooks事件 
*/
class AnalyzeWebpackPlugin {
  constructor(options = {}) {
    this.options = options
    console.log('AnalyzeWebpackPlugin Constructor')
  }
  apply(compiler) {
    debugger
    console.log('AnalyzeWebpackPlugin apply')
    // emit是异步串行的钩子--资源输出之前调用
    compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compilation) => {
      // 遍历所有即将输出的文件，得到大小
      const assets = Object.entries(compilation.assets)
      // 生成一个md文件
      // | 资源名称 | 资源大小 |
      let content = `| 资源名称 | 资源大小 |
      | --- | --- |`
      assets.forEach(([filename, file]) => {
        console.log(filename, file.size())
        content += `\n| ${filename} | ${Math.ceil(file.size() / 1024)}kb |`
      })
      compilation.assets['analyze.md'] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
    })
  }
}

module.exports = AnalyzeWebpackPlugin
