const { ModuleFederationPlugin } = require('webpack').container
module.exports = {
  mode: 'production',
  entery: './src/index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: 'nav',
      filename: 'remoteEntry.js',
      remote: {
        nav: 'nav@http://localhost:3003/remoteEntry.js'
      },
      exposes: {
        './Header': './src/Header.js'
      },
      shared: {}
    })
  ]
}

/// 组件中使用
import('nav/Header').then((Header) => {
  document.body.appendChild(Header.default())
})
