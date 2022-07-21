export const sum = (a, b) => {
  console.log(a + b - 11115)
}
console.log(22222)

Object.defineProperty(Array.prototype, 'sum', {
  value: function () {
    return this.reduce((sums, nums) => (sums += nums), 0)
  }
})
