/// <reference types="Cypress" />

describe("Campaign", () => {
  before(() => {
    cy.visit("/explore/campaigns")
    cy.get("[data-cy=explore-card]").find("big").contains("AirMOSS").click()
  })

  describe("the hero", () => {
    it("displays the short name", () => {
      cy.get("[data-cy=campaign-hero]").find("p").should("exist")
    })

    it("displays the long name as title", () => {
      cy.get("[data-cy=campaign-hero]").find("h1").should("exist")
      cy.get("h1").should("have.length", 1)
    })

    it("displays the focus area as subtitle", () => {
      cy.get("[data-cy=campaign-hero]").find("p").should("exist")
    })
    it("displays 3 big numbers", () => {
      cy.get("[data-cy=campaign-hero]")
        .find("[data-cy=stats]")
        .find("dd")
        .should($stat => {
          expect($stat, "3 items").to.have.length(3)
          expect($stat.eq(0), "first item").to.contain("Deployments")
          expect($stat.eq(1), "second item").to.contain("Collection Periods")
          expect($stat.eq(2), "third item").to.contain("Data Products")
        })
    })
    it("displays a map as background image", () => {
      cy.get("[data-cy=campaign-hero]").then($section => {
        expect($section[0].style["background-image"]).to.contain(
          "/styles/v1/mapbox/satellite-streets-v11/static"
        )
      })
    })
  })

  describe("the inpage nav", () => {
    it("exists", () => {
      cy.get("main").find("nav").should("exist")
    })

    it("has 6 items", () => {
      cy.get("main")
        .find("nav")
        .find("a")
        .should($anchor => {
          expect($anchor, "6 items").to.have.length(6)
          expect($anchor.eq(0), "first item").to.contain("Overview")
          expect($anchor.eq(1), "second item").to.contain("Focus")
          expect($anchor.eq(2), "third item").to.contain("Platforms")
          expect($anchor.eq(3), "fourth item").to.contain("Instruments")
          expect($anchor.eq(4), "fifth item").to.contain("Timeline")
          expect($anchor.eq(5), "last item").to.contain("Program Info")
        })
    })

    it("navigates to the inpage section", () => {
      ;["program-info", "platform", "overview", "timeline", "focus"].forEach(
        id => {
          cy.get(`[data-cy=${id}-inpage-link]`).click()

          cy.url().should("include", id)

          // TODO: figure out how to properly test the inpage scroll
          // cy.get("main")
          //   .find(`[data-cy=${id}-section]`)
          //   .find("h2")
          //   .should("be.inViewport")
        }
      )
    })
  })

  describe("the overview section", () => {
    it("exists", () => {
      cy.get("[data-cy=overview-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=overview-section]")
        .find("h2")
        .should("have.text", "Overview")
    })

    it("displays a description", () => {
      cy.get("[data-cy=description]").should("exist")
    })

    it("displays some facts", () => {
      cy.get("[data-cy=overview-content]")
        .find("label")
        .should($label => {
          expect($label, "4 items").to.have.length(4)

          expect($label.eq(0), "first item").to.contain("Study dates")
          expect($label.eq(1), "first item").to.contain("Region")
          expect($label.eq(2), "first item").to.contain("Season of Study")
          expect($label.eq(3), "first item").to.contain("Spatial bounds")
        })
    })

    it("displays link list", () => {
      cy.get("[data-cy=link-list]")
        .find("li")
        .should("have.length.within", 2, 5)
    })

    it("displays the DOI", () => {
      cy.get("[data-cy=link-list]")
        .find("[data-cy=doi-link]")
        .should("exist")
        .and("have.text", "Campaign DOI: not available")
    })
  })

  describe("the focus section", () => {
    it("exists", () => {
      cy.get("[data-cy=focus-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=focus-section]").find("h2").should("have.text", "Focus")
    })

    it("displays some infos", () => {
      cy.get("[data-cy=focus-content]").should($div => {
        expect($div, "3 info items").to.have.length(3)
      })
      cy.get("[data-cy=focus-content-label]").should($label => {
        expect($label, "3 labels").to.have.length(3)
      })
      cy.get("[data-cy=focus-content-text]").should($p => {
        expect($p, "2 text entries").to.have.length(1)
      })
    })

    it("navigates to the campaign list with the focus area as filter applied", () => {
      cy.get("[data-cy=focus-section]")
        .find("[data-cy=focus-area]")
        .contains("Carbon Cycle & Ecosystems")
        .click()

      cy.url().should("include", "/explore/campaigns")

      cy.get("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "focus: Carbon Cycle & Ecosystems")

      cy.get("[data-cy=explore-card]").should("have.length", 2)

      cy.go("back")
    })

    it("navigates to the campaign list with the geophysical concept as filter applied", () => {
      cy.get("[data-cy=focus-section]")
        .find("[data-cy=geophysical-concept]")
        .contains("Hydrology")
        .click()

      cy.url().should("include", "/explore/campaigns")

      cy.get("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "geophysical: Terr Hydro")

      cy.get("main").find("[data-cy=explore-card]").should("have.length", 2)

      cy.go("back")
    })
  })

  describe("the timeline section", () => {
    it("displays a milestone carousel", () => {
      cy.get("[data-cy=milestone-carousel]").find(".slider").should("exist")

      cy.get("[data-cy=milestone]").first().find("label").should("exist")
      cy.get("[data-cy=milestone]").first().find("img").should("exist")
      cy.get("[data-cy=milestone]").first().find("img").should("be.visible")
      cy.get("[data-cy=milestone]").first().find("h3").should("exist")
      cy.get("[data-cy=milestone]").first().find("p").should("exist")

      cy.get("[data-cy=milestone-carousel]")
        .find(".slider-control-centerright > button")
        .click()

      cy.get("[data-cy=milestone]").first().find("img").should("not.be.visible")
    })
    it("displays a timeline of milestones", () => {
      cy.get("[data-cy=milestone-timeline]").should("exist")
      cy.get("[data-cy=milestone-timeline]").first().find("ol").should("exist")
      cy.get("[data-cy=milestone-timeline]").first().find("li").should("exist")
    })
    it("displays a card for each li item", () => {
      cy.get("[data-cy=milestone-timeline-card]")
        .should("exist")
        .click({ multiple: true, force: true }) // needs to be forced in order to access the cards that exist outside of the window
      cy.get("[data-cy=milestone-timeline-card]")
        .first()
        .find("svg")
        .should("exist")
    })
  })

  describe("the platforms section", () => {
    it("exists", () => {
      cy.get("[data-cy=platform-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=platform-section]")
        .find("h2")
        .should("have.text", "Platforms & Instruments")
    })

    it("displays a platform carousel", () => {
      cy.get("[data-cy=platform-carousel]").find(".slider").should("exist")

      cy.get("[data-cy=platform]").first().find("img").should("exist")
      cy.get("[data-cy=platform]").first().find("img").should("be.visible")
      cy.get("[data-cy=platform]").first().find("label").should("exist")
      cy.get("[data-cy=platform-image-caption]").should("exist")

      cy.get("[data-cy=platform-carousel]").find(
        ".slider-control-centerright > button"
      )
    })

    it("displays some platforms", () => {
      cy.get("[data-cy=platform]").should($div => {
        expect($div, "3 platforms").to.have.length(3)
      })
    })

    it("displays the instruments per platform", () => {
      cy.get("[data-cy=platform]")
        .first()
        .find("[data-cy=instrument-chip]")
        .should($div => {
          expect($div, "2 instruments").to.have.length(2)
        })
    })
  })

  describe("the program info section", () => {
    it("exists", () => {
      cy.get("[data-cy=program-info-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=program-info-section]")
        .find("h2")
        .should("have.text", "Program Info")
    })

    it("displays the logo", () => {
      cy.get("[data-cy=campaign-logo]").should("exist")
    })

    it("displays some infos", () => {
      cy.get("[data-cy=program-info-content]").should($div => {
        expect($div, "8 info items").to.have.length(8)
      })
      cy.get("[data-cy=program-info-content-label]").should($label => {
        expect($label, "8 labels").to.have.length(8)
      })
      cy.get("[data-cy=program-info-content-text]").should($p => {
        expect($p, "6 text entries").to.have.length.within(6, 8)
      })
      cy.get("[data-cy=program-info-content-link]").should($a => {
        expect($a, "2 links").to.have.length.of.at.most(2)
      })
    })
  })
})
