/// <reference types="Cypress" />

describe("Searchbar", () => {
  beforeEach(() => {
    cy.visit("/explore/campaigns")
  })
  it("renders correctly", () => {
    cy.get("[data-cy=searchbar]")

    cy.get("[data-cy=filter-select]").invoke("text").should("contain", "Filter")

    cy.get("[data-cy=searchbar]")
      .find("input")
      .should("have.attr", "aria-label", "Enter search text")

    cy.get("[data-cy=submit]").should("exist")

    cy.get("[data-cy=sort-select]").should("exist")
  })

  it("should not reload on button click nor type and enter", () => {
    // mark the current window
    cy.window().then(w => (w.beforeReload = true))

    cy.window().should("have.prop", "beforeReload", true)

    cy.get("[data-cy=filter-select]").select("monsoon")

    cy.get("[data-cy=submit]").click()

    cy.window().should("have.prop", "beforeReload", true)

    cy.get("[data-cy=searchbar]")
      .find("input")
      .type("submitting some text")
      .type("{enter}")

    cy.window().should("have.prop", "beforeReload", true)
  })

  it("accepts typed input for search", () => {
    cy.get("[data-cy=searchbar]")
      .find("input")
      .type("what is the meaning of life?")

    cy.get("[data-cy=submit]").click()

    cy.get("[data-cy=searchbar]")
      .find("input")
      .should("have.value", "what is the meaning of life?")
  })

  it("adds and removes filters", () => {
    cy.get("[data-cy=filter-select]").select("monsoon")

    cy.get("[data-cy=searchbar]").find("[data-cy=filter-chip]").should("exist")

    cy.get("[data-cy=filter-chip]").find("button").click()

    cy.get("[data-cy=searchbar]")
      .find("[data-cy=filter-chip]")
      .should("not.exist")
  })

  it("sorts the list asc or desc", () => {
    cy.get("[data-cy=sort-select]").select("asc")

    cy.get("main")
      .find("[data-cy=explore-card]")
      .find("big")
      .should($big => {
        const first = $big.first().text()
        const last = $big.last().text()

        expect(first < last).to.be.true
      })

    cy.get("[data-cy=sort-select]").select("desc")

    cy.get("main")
      .find("[data-cy=explore-card]")
      .find("big")
      .should($big => {
        const first = $big.first().text()
        const last = $big.last().text()

        expect(first > last).to.be.true
      })
  })
})
