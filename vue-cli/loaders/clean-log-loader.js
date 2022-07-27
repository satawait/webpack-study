module.exports = function (content) {
  // 清除console语句
  return content.replace(/console\.log\(.*\);?/g, '')
}
