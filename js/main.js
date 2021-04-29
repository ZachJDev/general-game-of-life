import Probility from 'probility';
import Grid from './classes/Grid';
import {oneOf} from './functions/allOf';

const grid = new Grid(100, 100, 10);

const lowChance = new Probility([{'1/10000': true}, {'remainder': false}], {parseArray: true});

const s = p => {
  const {xSize, ySize, cellSize} = grid;

  const drawGrid = () => {

    for (let i = 0; i <= grid.ySize; i++) {
      p.line(0, i * cellSize, p.width, i * cellSize);
    }
    for (let i = 0; i <= grid.xSize; i++) {
      p.line(i * cellSize, 0, i * cellSize, p.height);
    }
  };
  const drawCells = () => {
    const drawCell = (x,y) => {
      p.rect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
    grid.cells.forEach((row, i) => {
      row.forEach((cell, k) => {
        if (cell) {
         drawCell(i,k)
        }
      });
    });
  };
  const updateCells = () => {
    const cells = grid.cells;

    const isDead = (x, y) => !cells[x][y];
    const isAlive = (x, y) => cells[x][y];

    const withSurrounding = (x, y) => (...numSurrounding) => numSurrounding.includes(grid.numSurrounding(x, y));
    const basedOnSurrounding = (func, ...numSurrounding) => (x, y) => withSurrounding(x, y)(...numSurrounding) && func(x, y);
    const withChance = (func, chance) => (x, y) => func(x, y) || chance.choose();

    const survives = (...numSurrounding) => (x, y) => basedOnSurrounding(isAlive, ...numSurrounding)(x, y);
    const born = (...numSurrounding) => (x, y) => basedOnSurrounding(isDead, ...numSurrounding)(x, y);

    const immaculateConception = (...numSurrounding) => (x, y) => withChance(born(...numSurrounding), lowChance)(x, y);

    grid.cells = Array.from({length: xSize},
      (_, x) =>
        Array.from({length: ySize},
          (_, y) =>
          oneOf(survives(2, 3), born(3))(x, y)));
  };
  p.setup = function () {
    // p.frameRate(15)
    p.createCanvas(xSize * cellSize, ySize * cellSize);
    p.fill(0);
  };

  p.draw = function () {
    p.background(255);
    drawCells();
    // drawGrid()
    updateCells();

  };

};

new p5(s); // invoke p5
