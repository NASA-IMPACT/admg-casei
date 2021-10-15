global.___loader = {
  enqueue: jest.fn(),
}

global.sessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
}

global.window = {
  setTimeout: jest.fn(),
}
