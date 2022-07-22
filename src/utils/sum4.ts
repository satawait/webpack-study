export const sum = (a: number, b: number) => {
  console.log(a + b - 11115)
}
console.log(22222)

Object.defineProperty(Array.prototype, 'sum', {
  value: function () {
    return this.reduce((sums: number, nums: number) => (sums += nums), 0)
  }
})
