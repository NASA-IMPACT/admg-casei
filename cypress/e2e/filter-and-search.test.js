/* eslint-disable jest/no-conditional-expect */
/// <reference types="Cypress" />

// TODO: this test is having issues with reach portals
// that are used to create the filter dropdown menus
// see https://github.com/reach/reach-ui/issues/629

describe.skip("Filter, Search and Sort", () => {
  it("should not reload on button click nor type and enter", () => {
    cy.visit("/explore/campaigns")

    // should show map on intitial load
    cy.get("[data-cy=main-explore]")
      .find("[data-cy=mapboxgl-map]")
      .should("not.exist")

    cy.get("[data-cy=tabbar]")

    // mark the current window
    cy.window().then(w => (w.beforeReload = true))

    cy.window().should("have.prop", "beforeReload", true)

    cy.get("[data-cy=explore-tools]")

    // should toggle map on button click
    cy.get(`[data-cy=map-toggle-btn]`).contains("Show Map").click()

    cy.window().should("have.prop", "beforeReload", true)

    cy.get(`[data-cy=map-toggle-btn]`).contains("Hide Map")

    cy.get("[data-cy=main-explore]")
      .find("[data-cy=mapboxgl-map]")
      .should("exist")

    cy.get("[data-cy=main-filter-label").should("exist").contains("Filter By")

    // cy.get(`[data-cy=season-filter-select]`).scrollTo("top").click()

    // cy.get("[data-cy=filter-options]")
    //   .scrollTo("top")
    //   .contains("li", "boreal winter")
    //   .click()

    // cy.get("[data-cy=submit]").click()

    // cy.window().should("have.prop", "beforeReload", true)

    cy.get("[data-cy=explore-input]")
      .type("submitting some text")
      .type("{enter}")

    cy.window().should("have.prop", "beforeReload", true)
  })
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
    // Running the test with platforms has issues on second filter
    //
    // {
    //   category: "platforms",
    //   filterExamples: [
    //     { id: "instrument", value: "Aerolaser" },
    //     { id: "instrument", value: "CPL" },
    //   ],
    // },
    //
    // Running test with instruments is flaky on CI
    //
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
        // a fresh reload before ever test helps avoiding the reach-ui/portal issue
        cy.visit(`/explore/${x.category}`)
        cy.get("h1").contains(`Explore ${x.category}`)
      })
      it(`filter ${x.category}`, () => {
        cy.get("[data-cy=explore-tools]").should("exist")

        cy.get("[data-cy=explore-input]").should(
          "have.attr",
          "aria-label",
          `Filter ${x.category} by name`
        )

        cy.get("[data-cy=submit]").should("exist")

        cy.get("[data-cy=sort-select]").should("exist")

        // cy.get(`[data-cy=${x.category}-card]`).then($cards => {
        //   x.filterExamples.forEach(filterExample => {
        //     const numBefore = $cards.length

        //     cy.get(`[data-cy=${filterExample.id}-filter-select]`).click()
        //     cy.get("[data-cy=filter-options]")
        //       .contains("li", filterExample.value)
        //       .click()

        //     cy.get("[data-cy=filter-chip]").should("exist")

        //     cy.get(`[data-cy=${x.category}-count]`)
        //       .invoke("text")
        //       .then(text => {
        //         expect(Number(text.slice(2, -1))).to.be.lessThan(numBefore)
        //       })

        //     cy.get(`[data-cy=${x.category}-card]`)
        //       .its("length")
        //       .should("be.lt", numBefore)

        //     cy.get("[data-cy=filter-chip]").find("button").click()

        //     cy.get("[data-cy=filter-chip]").should("not.exist")

        //     cy.get(`[data-cy=${x.category}-card]`)
        //       .its("length")
        //       .should("be.eq", numBefore)
        //   })
        // })
      })

      it(`clear all ${x.category}`, () => {
        cy.get(`[data-cy=${x.filterExamples[0].id}-filter-select]`).click()
        cy.wait(0)
        cy.get("[data-cy=filter-options]")
          .contains("li", x.filterExamples[0].value)
          .click()
        cy.wait(0)
        cy.get(`[data-cy=${x.filterExamples[1].id}-filter-select]`).click()
        cy.wait(0)
        cy.get("[data-cy=filter-options]")
          .contains("li", x.filterExamples[1].value)
          .click()
        cy.wait(0)
        cy.get("[data-cy=clear-filters]").should("exist")
        cy.get("[data-cy=clear-filters]").click()
        cy.wait(0)
        cy.get("[data-cy=filter-chip]").should("not.exist")
      })

      it(`sort ${x.category}`, () => {
        cy.get("[data-cy=sort-select]").click()
        cy.wait(0)
        cy.get("[data-cy=sort-options]").contains("li", "A TO Z").click()
        cy.wait(0)
        cy.get(`[data-cy=${x.category}-card]`)
          .find("big")
          .should($big => {
            const first = $big.first().text()
            const last = $big.last().text()

            expect(first < last).to.be.true
          })
        // })

        // it.skip(`TODO: the portal is kicked out and can't be clicked anymore`, () => {
        cy.get("[data-cy=sort-select]").click()
        cy.wait(0)
        cy.get("[data-cy=sort-options]").contains("li", "Z TO A").click()
        cy.wait(0)
        cy.get(`[data-cy=${x.category}-card]`)
          .find("big")
          .should($big => {
            const first = $big.first().text()
            const last = $big.last().text()

            expect(first > last).to.be.true
          })

        if (x.category === "campaigns") {
          cy.get("[data-cy=sort-select]").click()
          cy.wait(0)
          cy.get("[data-cy=sort-options]").contains("li", "MOST RECENT").click()

          cy.get(`[data-cy=${x.category}-card]`)
            .find("[data-cy=daterange]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first > last).to.be.true
            })

          cy.get("[data-cy=sort-select]").click()
          cy.wait(0)
          cy.get("[data-cy=sort-options]").contains("li", "OLDEST").click()
          cy.wait(0)
          cy.get(`[data-cy=${x.category}-card]`)
            .find("[data-cy=daterange]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first < last).to.be.true
            })
        }

        if (x.category === "platforms" || x.category === "instruments") {
          cy.get("[data-cy=sort-select]").click()
          cy.wait(0)
          cy.get("[data-cy=sort-options]").contains("li", "MOST USED").click()
          cy.wait(0)
          cy.get(`[data-cy=${x.category}-card]`)
            .find("[data-cy=count1]")
            .should($small => {
              const first = $small.first().text()
              const last = $small.last().text()

              expect(first > last).to.be.true
            })
        }
      })
    })
  })
})
