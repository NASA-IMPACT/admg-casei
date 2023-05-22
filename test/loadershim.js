global.___loader = {
  enqueue: jest.fn(),
}

Object.defineProperty(global, "sessionStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
})

global.window = {
  setTimeout: jest.fn(),
}
