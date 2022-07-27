import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
// import ElementPlus from 'element-plus'

import './assets/styles/index.less'
// import 'element-plus/dist/index.css'
console.log('app log')
const num: number[] = [1, 2, 3]
num.forEach((element: number) => {
  console.log(element)
})
createApp(App)
  .use(router)
  .mount(document.querySelector('#app') as HTMLElement)
