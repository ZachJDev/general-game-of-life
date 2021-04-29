export default class Rule {
  constructor(func, cells) {
    this.testFunction = func;
    this.cells = cells
  }
  test(x,y) {

    return this.testFunction(x,y)
  }
}
