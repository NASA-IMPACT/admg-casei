module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/test/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/test/__mocks__/file-mock.js`,
    "styled-components": `<rootDir>/node_modules/styled-components/dist/styled-components.cjs.js`, // https://github.com/styled-components/styled-components/issues/1451#issuecomment-361661563
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `<rootDir>/e2e/`,
    `<rootDir>/playwright/*`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/test/jest.setup.js`, `<rootDir>/test/loadershim.js`],
}
