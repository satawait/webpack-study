/* 
webpack加载配置，执行constructor
webpack创建compiler对象
便利plugins，调用apply方法
出发各个hooks事件 
*/
class CleanWebpackPlugin {
  constructor(options = {}) {
    this.options = options
    console.log('CleanWebpackPlugin Constructor')
  }
  apply(compiler) {
    debugger
    console.log('CleanWebpackPlugin apply')
    // 获取输出目录
    console.log(compiler.options.output.path, compiler.outputPath)
    // const outputPath = compiler.outputPath
    const outputPath = compiler.options.output.path
    const fs = compiler.outputFileSystem
    // emit是异步串行的钩子--资源输出之前调用
    compiler.hooks.emit.tap('CleanWebpackPlugin', () => {
      // 通过fs删除打包输出目录下的所有文件
      this.removeFiles(fs, outputPath)
    })
  }
  removeFiles(fs, filePath) {
    // 想要删除目录，需将目录下所有资源
    // 读取当前目录下所有资源，需要判断是文件还是文件夹，文件夹需要递归删除
    const files = fs.readdirSync(filePath)
    files.forEach((file) => {
      const path = `${filePath}/${file}`
      const fileStat = fs.statSync(path)
      if (fileStat.isDirectory()) {
        this.removeFiles(fs, path)
        fs.rmdirSync(path)
      } else {
        fs.unlinkSync(path)
      }
    })
  }
}

module.exports = CleanWebpackPlugin
