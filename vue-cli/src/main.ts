import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import ElementPlus from 'element-plus'

import './assets/styles/index.less'
import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount(document.querySelector('#app') as HTMLElement)
