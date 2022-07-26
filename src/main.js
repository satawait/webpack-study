import './styles/index.css'
import './styles/index.less'
import './styles/index.scss'
import './styles/index.styl'
import { sum } from './utils/sum.js'

// eslint-disable-next-line no-unused-vars
import './utils/sum2.js'
sum(5, 236633)
console.log('hello world')
// document.querySelector('#btn').onclick = () => {
//   import(/* webpackChunkName: "sum" */ './utils/sum2.js').then((res) => {
//     console.log('click', res.sum(3, 8))
//   })
// }
