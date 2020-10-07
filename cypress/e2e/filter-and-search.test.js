/// <reference types="Cypress" />

import api from "../../src/utils/api"

describe("Explore Tools", () => {
  ;[
    {
      category: "campaigns",
      filterExamples: [
        "Weather",
        "Clouds",
        "boreal winter",
        "rainforest",
        "C-23 Sherpa",
      ],
    },
    { category: "platforms", filterExamples: ["Aerolaser", "CPC"] },
    {
      category: "instruments",
      filterExamples: [
        "In Situ - Spectrometer/Radiometer",
        "In Situ - Sampler",
      ],
    },
  ].forEach(x => {
    describe(x.category, () => {
      beforeEach(() => {
        cy.visit(`/explore/${x.category}`)
      })
      it("renders correctly", () => {
        cy.get("[data-cy=explore-tools]")
        cy.get("[data-cy=filter-select]")
          .invoke("text")
          .should("contain", "Filter")

        cy.get("[data-cy=explore-tools]")
          .find("[data-cy=explore-input]")
          .should("have.attr", "aria-label", "Enter search text")

        cy.get("[data-cy=submit]").should("exist")

        cy.get("[data-cy=sort-select]").should("exist")
      })

      it("should not reload on button click nor type and enter", () => {
        // mark the current window
        cy.window().then(w => (w.beforeReload = true))

        cy.window().should("have.prop", "beforeReload", true)

        cy.get("[data-cy=explore-tools]")
        cy.get("[data-cy=filter-select]").click()

        cy.get("[data-cy=filter-options]")
          .find("[data-cy=filter-option]")
          .contains(x.filterExamples[0])
          .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

        cy.get("[data-cy=submit]").click()

        cy.window().should("have.prop", "beforeReload", true)

        cy.get("[data-cy=explore-tools]")
          .find("[data-cy=explore-input]")
          .type("submitting some text")
          .type("{enter}")

        cy.window().should("have.prop", "beforeReload", true)
      })

      it("adds and removes filters", () => {
        cy.get("[data-cy=explore-card]").then($cards => {
          x.filterExamples.forEach(filterExample => {
            const numBefore = $cards.length

            cy.get("[data-cy=explore-tools]")
            cy.get("[data-cy=filter-select]").click()
            cy.get("[data-cy=filter-options]")
              .find("[data-cy=filter-option]")
              .contains(filterExample)
              .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

            cy.get("[data-cy=filter-chip]").should("exist")

            cy.get("[data-cy=item-count]").should(
              "contain",
              ` of ${numBefore} ${x.category}`
            )

            cy.get("main")
              .find("[data-cy=explore-card]")
              .its("length")
              .should("be.lt", numBefore)

            cy.get("[data-cy=filter-chip]").find("button").click()

            cy.get("[data-cy=filter-chip]").should("not.exist")

            cy.get("[data-cy=item-count]").should("not.contain", " of ")

            cy.get("[data-cy=item-count]").should(
              "have.text",
              `Showing ${numBefore} ${x.category}`
            )

            cy.get("main")
              .find("[data-cy=explore-card]")
              .its("length")
              .should("be.eq", numBefore)
          })
        })
      })

      it("clears all filters", () => {
        x.filterExamples.forEach(filterExample => {
          cy.get("[data-cy=explore-tools]")
          cy.get("[data-cy=filter-select]").click()
          cy.get("[data-cy=filter-options]")
            .find("[data-cy=filter-option]")
            .contains(filterExample)
            .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none
        })
        cy.get("[data-cy=clear-filters]").should("exist")
        cy.get("[data-cy=clear-filters]").click()
        cy.get("[data-cy=filter-chip]").should("not.exist")
      })

      it("sorts the list 'a to z' or 'z to a'", () => {
        cy.get("[data-cy=explore-tools]")
        cy.get("[data-cy=sort-select]").click()
        cy.get("[data-cy=sort-options]")
          .find("li")
          .contains("A TO Z")
          .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

        cy.get("[data-cy=explore-card]")
          .find("big")
          .should($big => {
            const first = $big.first().text()
            const last = $big.last().text()

            expect(first < last).to.be.true
          })

        cy.get("[data-cy=sort-select]").click()
        cy.get("[data-cy=sort-options]")
          .find("[data-cy=sort-option]")
          .contains("Z TO A")
          .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

        cy.get("[data-cy=explore-card]")
          .find("big")
          .should($big => {
            const first = $big.first().text()
            const last = $big.last().text()

            expect(first > last).to.be.true
          })
      })

      if (x.category === "campaigns") {
        it("sorts the list be most recent", () => {
          cy.get("[data-cy=explore-tools]")
          cy.get("[data-cy=sort-select]").click()
          cy.get("[data-cy=sort-options]")
            .find("[data-cy=sort-option]")
            .contains("MOST RECENT")
            .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

          cy.get("[data-cy=explore-card]")
            .find("[data-cy=daterange]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first > last).to.be.true
            })
        })

        it("sorts the list be oldest", () => {
          cy.get("[data-cy=explore-tools]")
          cy.get("[data-cy=sort-select]").click()
          cy.get("[data-cy=sort-options]")
            .find("[data-cy=sort-option]")
            .contains("OLDEST")
            .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

          cy.get("[data-cy=explore-card]")
            .find("[data-cy=daterange]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first < last).to.be.true
            })
        })
      }

      if (x.category === "platforms" || x.category === "instruments") {
        it("sorts the list be most used", () => {
          cy.get("[data-cy=explore-tools]")
          cy.get("[data-cy=sort-select]").click()
          cy.get("[data-cy=sort-options]")
            .find("[data-cy=sort-option]")
            .contains("MOST USED")
            .click({ force: true }) // neccessary due to css from library that labels the parent div with visibility:none

          cy.get("[data-cy=explore-card]")
            .find("[data-cy=count1]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first > last).to.be.true
            })
        })
      }
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

      cy.get("[data-cy=explore-tools]").find("input").type("arctic")

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
        cy.get("[data-cy=explore-tools]")
          .find("input")
          .should("have.value", "arctic")

        cy.get("[data-cy=explore-card]").should("have.length.greaterThan", 1)
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
