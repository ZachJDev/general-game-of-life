export function allOf(...args) {
  return (x,y)=>args.reduce((prev, cur) => prev && cur(x,y), true)
}

export function oneOf(...args) {
  return (x,y)=>args.reduce((prev, cur) => prev || cur(x,y), false)
}

