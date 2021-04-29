import Probility from 'probility'
const x = new Probility([{"25%": true}, {'remainder': false}],{parseArray: true})
export default class Grid {
  constructor(xSize, ySize, cellSize) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.cellSize = cellSize;
    this.cells = Array.from({length: ySize}, (a) => Array.from({length: xSize}, (cell) => x.choose()))
  }

  numSurrounding(x,y) {
    let count = 0;
    for(let i = x - 1; i <= x + 1; i++) {
      if(i < 0 || i >= this.xSize) continue
      for(let k = y - 1; k <= y + 1; k++) {
        if(k < 0 || k >= this.ySize|| (x === i && k === y)) continue
        if(this.cells[i][k] ) count++
      }
    }
    return count;
  }
}
