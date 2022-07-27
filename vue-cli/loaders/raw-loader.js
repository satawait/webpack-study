// content 是buffer数据
function rawLoader(content) {
  console.log(content)
  return content
}
rawLoader.raw = true
module.exports = rawLoader
