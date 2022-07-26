import './styles/index.css'
import './styles/index.less'
import './styles/index.scss'
import './styles/index.styl'
// import 'core-js'
// import 'core-js/es/promise'
// import { sum } from './utils/sum3'
import './utils/sum4'
import { internal } from './utils/lib'
console.log('internal', internal)
// sum(5, 40000)
const btn = document.querySelector('#btn') as HTMLElement
btn.onclick = () => {
  import(/* webpackChunkName: "sum" */ './utils/sum3').then((res) => {
    console.log('click', res.sum(3, 8))
  })
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
new Promise((resolve) => {
  setTimeout(() => {
    console.log('执行了')
    resolve('执行了')
  }, 1000)
})
type TA = {
  name: string
  age: number
}
type TB = {
  name: string
  age: number
  gender: number
}
let tb: TB = {
  name: 'a',
  age: 20,
  gender: 1
}
let ta: TA = {
  name: 'a',
  age: 20
}
ta = tb
console.log(ta)
