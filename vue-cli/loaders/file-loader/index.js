const loaderUtils = require('loader-utils')
// content 是buffer数据
function rawLoader(content) {
  // 生成hash文件名
  const interpolateName = loaderUtils.interpolateName(this, '[hash].[ext][query]', { content })
  // 输出文件
  this.emitFile(interpolateName, content)
  // 返回文件路径和文件名
  return `module.exports = ${interpolateName}`
}
rawLoader.raw = true
module.exports = rawLoader
