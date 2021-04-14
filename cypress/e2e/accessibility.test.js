/// <reference types="Cypress" />

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      "#": nodes.length,
      nodes: JSON.stringify(nodes.map(node => node.html)),
    })
  )

  cy.task("table", violationData)
}

describe("Accessibility tests", () => {
  it("Has no detectable accessibility violations on load", () => {
    cy.visit("/")
    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /explore and checks for accessibility violations", () => {
    cy.visit("/explore")
    cy.injectAxe()

    cy.get("[data-cy=tabbar]").should("exist")

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page for a /campaign and checks for accessibility violations", () => {
    cy.visit("/explore")

    cy.get("[data-cy=tabbar]")
      .findByText(/Campaigns/i)
      .click()

    cy.get("[data-cy=campaigns-card]").first().click()

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  // TODO: carousel contains Focusable content (campaign card as link) that is hidden on the other slides
  // a11y error!aria-hidden-focus on 1 Node
  it.skip("Navigates to page for a /platform and checks for accessibility violations", () => {
    // cy.visit("/explore")
    cy.visit("/platform/G-III")

    // cy.get("[data-cy=tabbar]")
    //   .findByText(/Platforms/i)
    //   .click()
    // TODO: understand why this is brittle on ci
    // cy.get("[data-cy=platforms-card]").last().click()

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page for a /instrument and checks for accessibility violations", () => {
    // cy.visit("/explore")
    cy.visit("/instrument/UAVSAR")

    // cy.get("[data-cy=tabbar]")
    //   .findByText(/Instruments/i)
    //   .click()
    // TODO: understand why this is brittle on ci
    // cy.get("[data-cy=instruments-card]").first().click()

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /glossary and checks for accessibility violations", () => {
    cy.visit("/glossary")

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /about and checks for accessibility violations", () => {
    cy.visit("/about")

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /contact and checks for accessibility violations", () => {
    cy.visit("/contact")

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })
})
