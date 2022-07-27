// content 文件内容
// map SourceMap
// meta 传递的参数

// module.exports = (content, map, meta) => {
//   console.log(content)
//   return content
// }

module.exports = function (content, map, meta) {
  console.log('sync loader', content)
  // 第一个参数是error
  // 将参数传递给下个loader
  this.callback(null, content, map, meta)
}
