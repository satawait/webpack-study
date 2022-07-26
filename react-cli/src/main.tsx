import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './assets/styles/index.less'
import 'antd/dist/antd.less'

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
