/// <reference types="Cypress" />

import api from "../../src/utils/api"

// TODO: this test is having issues with reach portals
// that are used to create the filter dropdown menus
// see https://github.com/reach/reach-ui/issues/629

describe("Filter, Search and Sort", () => {
  ;[
    {
      category: "campaigns",
      filterExamples: [
        { id: "focus", value: "Weather" },
        { id: "geophysical", value: "Clouds" },
        { id: "season", value: "boreal winter" },
        { id: "region", value: "rainforest" },
        { id: "platform", value: "C-23 Sherpa" },
      ],
    },
    // Running the test with only campaigns seems to be a bit more stable
    //
    // {
    //   category: "platforms",
    //   filterExamples: [
    //     { id: "instrument", value: "Aerolaser" },
    //     { id: "instrument", value: "CPL" },
    //   ],
    // },
    // {
    //   category: "instruments",
    //   filterExamples: [
    //     { id: "type", value: "Multi" },
    //     { id: "vertical", value: "Stratosphere" },
    //   ],
    // },
  ].forEach(x => {
    describe(`${x.category}`, () => {
      beforeEach(() => {
        cy.visit("/explore")
        cy.get("[data-cy=tabbar]")
          .contains("button", x.category, { matchCase: false })
          .click()
      })

      it("renders correctly", () => {
        cy.get("[data-cy=explore-tools]").should("exist")

        cy.get("[data-cy=explore-input]").should(
          "have.attr",
          "aria-label",
          "Search for campaigns, platforms or instruments"
        )

        cy.get("[data-cy=submit]").should("exist")

        cy.get("[data-cy=sort-select]").should("exist")
      })

      it("should not reload on button click nor type and enter", () => {
        // mark the current window
        cy.window().then(w => (w.beforeReload = true))

        cy.window().should("have.prop", "beforeReload", true)

        cy.get("[data-cy=explore-tools]")
        cy.get(`[data-cy=${x.filterExamples[0].id}-filter-select]`).click()

        cy.get("[data-cy=filter-options]")
          .contains("li", x.filterExamples[0].value)
          .click()

        cy.get("[data-cy=submit]").click()

        cy.window().should("have.prop", "beforeReload", true)

        cy.get("[data-cy=explore-input]")
          .type("submitting some text")
          .type("{enter}")

        cy.window().should("have.prop", "beforeReload", true)
      })

      it("adds and removes filters", () => {
        cy.get(`[data-cy=${x.category}-card]`).then($cards => {
          x.filterExamples.forEach(filterExample => {
            const numBefore = $cards.length

            cy.get(`[data-cy=${filterExample.id}-filter-select]`).click()
            cy.get("[data-cy=filter-options]")
              .contains("li", filterExample.value)
              .click()

            cy.get("[data-cy=filter-chip]").should("exist")

            cy.get(`[data-cy=${x.category}-count]`)
              .invoke("text")
              .then(text => {
                expect(Number(text.slice(2, -1))).to.be.lessThan(numBefore)
              })

            cy.get(`[data-cy=${x.category}-card]`)
              .its("length")
              .should("be.lt", numBefore)

            cy.get("[data-cy=filter-chip]").find("button").click()

            cy.get("[data-cy=filter-chip]").should("not.exist")

            cy.get(`[data-cy=${x.category}-card]`)
              .its("length")
              .should("be.eq", numBefore)
          })
        })
      })

      it("clears all filters", () => {
        cy.get(`[data-cy=${x.filterExamples[0].id}-filter-select]`).click()
        cy.get("[data-cy=filter-options]")
          .contains("li", x.filterExamples[0].value)
          .click()

        cy.get(`[data-cy=${x.filterExamples[1].id}-filter-select]`).click()
        cy.get("[data-cy=filter-options]")
          .contains("li", x.filterExamples[1].value)
          .click()

        cy.get("[data-cy=clear-filters]").should("exist")
        cy.get("[data-cy=clear-filters]").click()
        cy.get("[data-cy=filter-chip]").should("not.exist")
      })

      it("sorts the list 'a to z' or 'z to a'", () => {
        cy.get("[data-cy=sort-select]").click()
        cy.get("[data-cy=sort-options]").contains("li", "A TO Z").click()

        cy.get(`[data-cy=${x.category}-card]`)
          .find("big")
          .should($big => {
            const first = $big.first().text()
            const last = $big.last().text()

            expect(first < last).to.be.true
          })

        // TODO: the portal is kicked out here and can't be clicked anymore

        // cy.get("[data-cy=sort-select]").click()
        // cy.get("[data-cy=sort-options]").contains("li", "Z TO A").click()

        // cy.get(`[data-cy=${x.category}-card]`)
        //   .find("big")
        //   .should($big => {
        //     const first = $big.first().text()
        //     const last = $big.last().text()

        //     expect(first > last).to.be.true
        //   })
      })

      if (x.category === "campaigns") {
        it("sorts the list be most recent", () => {
          cy.get("[data-cy=sort-select]").click()
          cy.get("[data-cy=sort-options]").contains("li", "MOST RECENT").click()

          cy.get(`[data-cy=${x.category}-card]`)
            .find("[data-cy=daterange]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first > last).to.be.true
            })
        })

        it("sorts the list be oldest", () => {
          cy.get("[data-cy=sort-select]").click()
          cy.get("[data-cy=sort-options]").contains("li", "OLDEST").click()

          cy.get(`[data-cy=${x.category}-card]`)
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
          cy.get("[data-cy=sort-select]").click()
          cy.get("[data-cy=sort-options]").contains("li", "MOST USED").click()

          cy.get(`[data-cy=${x.category}-card]`)
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

        cy.get(`[data-cy=campaigns-card]`).should("have.length.greaterThan", 1)
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
