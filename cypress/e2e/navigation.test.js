/// <reference types="cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("going back or forward in the browser's history is possible", () => {
    // https://on.cypress.io/go

    cy.get("nav").contains("Contact").click()
    cy.location("pathname").should("include", "contact")

    cy.go("back")
    cy.location("pathname").should("not.include", "contact")

    cy.go("forward")
    cy.location("pathname").should("include", "contact")

    // clicking back
    cy.go(-1)
    cy.location("pathname").should("not.include", "contact")

    // clicking forward
    cy.go(1)
    cy.location("pathname").should("include", "contact")
  })

  it("reloading the page maintains the url", () => {
    // https://on.cypress.io/reload

    cy.get("nav").contains("Contact").click()
    cy.location("pathname").should("include", "contact")

    cy.reload()
    cy.location("pathname").should("include", "contact")

    // reload the page without using the cache
    cy.reload(true)
    cy.location("pathname").should("include", "contact")
  })

  it("visiting a remote url directly loads the respective page", () => {
    // https://on.cypress.io/visit

    // Visit any sub-domain of your current domain

    // Pass options to the visit
    cy.visit("/contact", {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === "object").to.be.true
      },
      onLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === "object").to.be.true
      },
    })

    cy.location("pathname").should("include", "contact")
    cy.get("main").contains("feedback")
  })
})
