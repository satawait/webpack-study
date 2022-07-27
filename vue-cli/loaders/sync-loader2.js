// content 文件内容
// map SourceMap
// meta 传递的参数

// module.exports = (content, map, meta) => {
//   console.log(content)
//   return content
// }

module.exports = function (content, map, meta) {
  console.log('sync loader2-1')
  // 第一个参数是error
  // 将参数传递给下个loader
  setTimeout(() => {
    console.log('sync loader2-2')
    this.callback(null, content, map, meta)
  }, 1000)
}
