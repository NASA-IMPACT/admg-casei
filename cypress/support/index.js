// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"
import "./assertions"

// Alternatively you can use CommonJS syntax:
// require('./commands')

import "@cypress/code-coverage/support"
import "cypress-axe"
import "@testing-library/cypress/add-commands"

// https://github.com/cypress-io/cypress/issues/95#issuecomment-347607198
Cypress.on("window:before:load", win => {
  win.fetch = (url, options) =>
    new Promise(resolve => {
      setTimeout(function () {
        resolve({
          ok: true,
          json: () => {
            url, options
          },
        })
      }, 250)
    })
})
