/// <reference types="Cypress" />

import api from "../../src/utils/api"

describe("Searchbar", () => {
  ;[
    {
      category: "campaigns",
      filterExamples: [
        "Weather",
        "Tectonic Processes",
        "boreal winter",
        "rainforest",
        "C-23 Sherpa",
      ],
    },
    { category: "platforms", filterExamples: ["Aerolaser"] },
  ].forEach(x => {
    describe(x.category, () => {
      beforeEach(() => {
        cy.visit(`/explore/${x.category}`)
      })
      it("renders correctly", () => {
        cy.get("[data-cy=searchbar]")

        cy.get("[data-cy=filter-select]")
          .invoke("text")
          .should("contain", "Filter")

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

        cy.get("[data-cy=filter-select]").select(x.filterExamples[0])

        cy.get("[data-cy=submit]").click()

        cy.window().should("have.prop", "beforeReload", true)

        cy.get("[data-cy=searchbar]")
          .find("input")
          .type("submitting some text")
          .type("{enter}")

        cy.window().should("have.prop", "beforeReload", true)
      })

      it("adds and removes filters", () => {
        cy.get("main")
          .find("[data-cy=explore-card]")
          .then($cards => {
            x.filterExamples.forEach(filterExample => {
              const numBefore = $cards.length

              cy.get("[data-cy=filter-select]").select(filterExample)

              cy.get("[data-cy=filter-chip]").should("exist")

              cy.get("[data-cy=explore-card]").then($card => {
                const numAfter = $card.length
                expect(numAfter).to.be.lessThan(numBefore)
              })

              cy.get("[data-cy=filter-chip]").find("button").click()

              cy.get("[data-cy=filter-chip]").should("not.exist")

              cy.get("[data-cy=explore-card]").then($card => {
                const numAfter = $card.length
                expect(numAfter).to.be.equal(numBefore)
              })
            })
          })
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
  })

  let searchApiStub
  // Turns out, dealing with fetch requests in cypress isn't that easy:
  // https://github.com/cypress-io/cypress/issues/95
  describe.skip("the free text search", () => {
    beforeEach(() => {
      searchApiStub = cy
        .stub(api, "fetchSearchResult")
        .as("fetchSearchResultStub")

      cy.get("[data-cy=searchbar]").find("input").type("arctic")

      cy.get("[data-cy=submit]").click()
    })

    it("should indicate the loading", () => {
      cy.get("[data-cy=loading-indicator]").should("be.visible")
    })

    describe("on api success", () => {
      beforeEach(() => {
        searchApiStub.resolves(["id1", "id2"])
      })

      it("call the api and get a successfull response", () => {
        // TODO: why does it claim not to be called? Why does it still call the implementation? What's going on with the stubbing here?
        expect(api.fetchSearchResult).to.be.called
      })

      it("should hide the loading indicator", () => {
        cy.get("[data-cy=loading-indicator]").should("not.be.visible")
      })

      it("filters the campaigns based on api response", () => {
        cy.get("[data-cy=searchbar]")
          .find("input")
          .should("have.value", "arctic")

        cy.get("main")
          .find("[data-cy=explore-card]")
          .should("have.length.greaterThan", 1)
      })
    })

    describe("on api failure", () => {
      beforeEach(() => {
        searchApiStub.returns(new Error("UUUPS, there was an error"))
      })

      it("displays an error message", () => {
        cy.get("[data-cy=error-indicator]").should("be.visible")
      })
    })
  })
})
