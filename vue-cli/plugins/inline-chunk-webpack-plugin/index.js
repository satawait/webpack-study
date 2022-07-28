/* 
webpack加载配置，执行constructor
webpack创建compiler对象
便利plugins，调用apply方法
出发各个hooks事件 
*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
class InlineChunkWebpackPlugin {
  constructor(options = {}) {
    this.options = options
    console.log('InlineChunkWebpackPlugin Constructor')
  }
  apply(compiler) {
    debugger
    console.log('InlineChunkWebpackPlugin apply')
    compiler.hooks.compilation.tap('InlineChunkWebpackPlugin', (compilation) => {
      // 获取html-webpack-plugin的hooks
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      // 注册alterAssetTagGroups
      // 将script的runtime文件变成inline script
      hooks.alterAssetTagGroups.tap('InlineChunkWebpackPlugin', (assets) => {
        assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets)
        assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets)
      })
      hooks.afterEmit.tap('InlineChunkWebpackPlugin', () => {
        Object.keys(compilation.assets).forEach((filePath) => {
          if (/runtime(.*).js$/g.test(filePath)) {
            delete compilation.assets[filePath]
          }
        })
      })
    })
  }
  getInlineChunk(tags, assets) {
    return tags.map((tag) => {
      if (tag.tagName !== 'script') {
        return tag
      }
      console.log(tag?.attributes?.src, 1111)
      const filePath = tag.attributes.src
      if (!filePath) {
        return tag
      }
      if (!/runtime(.*).js$/g.test(filePath)) return tag
      return {
        tagName: 'script',
        innerHTML: assets[filePath].source(),
        closeTag: true
      }
    })
  }
}

module.exports = InlineChunkWebpackPlugin
