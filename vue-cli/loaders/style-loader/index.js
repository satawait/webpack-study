// 先要使用css-loader，style-loader只能处理样式，不能处理样式中的资源
module.exports = function (content) {
  return content
}

module.exports.pitch = function (remainingRequest) {
  // remainingRequest剩余要处理的loader
  // 将remainingRequest中的绝对路径改为相对路径，后续只能使用相对路径操作
  const relativePath = remainingRequest
    .split('!')
    .map((path) => {
      // 返回相对路径
      return this.utils.contextify(this.context, path)
    })
    .join('!')

  // 引入css-loader处理后的资源
  // 创建style标签插入页面
  // !!终止后面loader执行
  const script = `
    import style from "!!${relativePath}"
      const styleEl = document.createElement('style')
      styleEl.innerHTML = style
      document.head.appendChild(styleEl)
    `
  return script
}
