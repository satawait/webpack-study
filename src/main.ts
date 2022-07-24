import './styles/index.css'
import './styles/index.less'
import './styles/index.scss'
import './styles/index.styl'
import { sum } from './utils/sum3'
import './utils/sum4'
sum(5, 40000)
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
