// https://jestjs.io/docs/getting-started#using-babel
// Configure Babel to target your current version of Node by creating a babel.config.js file in the root of your project:

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    // Jest supports TypeScript, via Babel. First, make sure you followed the instructions on using Babel above. Next, install the @babel/preset-typescript:
    "@babel/preset-typescript",
  ],
}
