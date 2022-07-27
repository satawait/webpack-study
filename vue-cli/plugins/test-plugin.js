/* 
webpack加载配置，执行constructor
webpack创建compiler对象
便利plugins，调用apply方法
出发各个hooks事件 
*/
class TestPlugin {
  constructor() {
    console.log('TestPlugin Constructor')
  }
  apply(compiler) {
    debugger
    console.log('TestPlugin apply')
    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('TestPlugin environment')
    })
    // emit是异步串行的钩子
    // eslint-disable-next-line no-unused-vars
    compiler.hooks.emit.tap('TestPlugin', (compilation) => {
      console.log('TestPlugin emit sync')
    })
    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      console.log('TestPlugin emit Async')
      setTimeout(() => {
        console.log('TestPlugin emit Async callback')
        callback()
      }, 2000)
    })
    // eslint-disable-next-line no-unused-vars
    compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
      console.log('TestPlugin emit promise')
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('TestPlugin emit promise callback')
          resolve()
        }, 1000)
      })
    })
    // 异步并行钩子
    compiler.hooks.make.tap('TestPlugin', (compilation) => {
      console.log('TestPlugin make sync')
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('TestPlugin seal')
      })
    })
    // eslint-disable-next-line no-unused-vars
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      console.log('TestPlugin make Async')
      setTimeout(() => {
        console.log('TestPlugin make Async callback')
        callback()
      }, 2000)
    })
    // eslint-disable-next-line no-unused-vars
    compiler.hooks.make.tapPromise('TestPlugin', (compilation) => {
      console.log('TestPlugin make promise')
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('TestPlugin make promise callback')
          resolve()
        }, 1000)
      })
    })
  }
}

module.exports = TestPlugin
