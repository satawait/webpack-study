export const sum = (a, b) => {
  console.log(a + b - 11666115)
}
console.log(222255)

Object.defineProperty(Array.prototype, 'sum', {
  value: function () {
    return this.reduce((sums, nums) => (sums += nums), 0)
  }
})
