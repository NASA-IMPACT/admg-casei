/// <reference types="Cypress" />

describe("Campaign", () => {
  before(() => {
    cy.visit("/explore/campaigns")
    cy.get("main").find("[data-cy=explore-card]").contains("AirMOSS").click()
  })

  describe("the header", () => {
    it("displays the short name", () => {
      cy.get("main").find("header").find("p").should("exist")
    })

    it("displays the long name as title", () => {
      cy.get("main").find("h1").should("exist")
      cy.get("h1").should("have.length", 1)
    })

    it("displays the focus area as subtitle", () => {
      cy.get("main").find("header").find("p").should("exist")
    })
    it("displays 3 big numbers", () => {
      cy.get("main")
        .find("header")
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
      cy.get("main")
        .find("header")
        .then($header => {
          expect($header[0].style["background-image"]).to.contain(
            "/styles/v1/mapbox/satellite-streets-v11/static"
          )
        })
    })
  })

  describe("the inpage nav", () => {
    it("exists", () => {
      cy.get("main").find("nav").should("exist")
    })

    it("has 5 items", () => {
      cy.get("main")
        .find("nav")
        .find("a")
        .should($anchor => {
          expect($anchor, "7 items").to.have.length(7)
          expect($anchor.eq(0), "first item").to.contain("Overview")
          expect($anchor.eq(1), "second item").to.contain("Focus")
          expect($anchor.eq(2), "third item").to.contain("Platforms")
          expect($anchor.eq(3), "fourth item").to.contain("Instruments")
          expect($anchor.eq(4), "fifth item").to.contain("Timeline")
          expect($anchor.eq(5), "sixth item").to.contain("Data")
          expect($anchor.eq(6), "last item").to.contain("Program Info")
        })
    })

    it("navigates to the inpage section", () => {
      cy.get("[data-cy=program-info-section]").find("h2").should("be.visible")
      cy.get("[data-cy=program-info-section]")
        .find("h2")
        .should("not.be.inViewport")

      cy.get("main").find("nav").find("a").last().click()

      cy.url().should("include", "#program-info")
      cy.get("[data-cy=program-info-section]")
        .find("h2")
        .should("be.inViewport")
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
      cy.get("[data-cy=overview-fact]")
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
        .find("label")
        .should("contain", "Relevant Links")

      cy.get("[data-cy=link-list]").find("li").should("have.length", 5)
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
        expect($p, "2 text entries").to.have.length(2)
      })
    })
  })

  describe("the timeline section", () => {
    it("displays a milestone carousel", () => {
      cy.get("[data-cy=milestone-carousel]").find(".slider").should("exist")

      cy.get("[data-cy=milestone]").first().find("label").should("exist")
      cy.get("[data-cy=milestone]").first().find("img").should("exist")
      cy.get("[data-cy=milestone]").first().find("img").should("be.visible")
      cy.get("[data-cy=milestone]").first().find("h3").should("exist")
      cy.get("[data-cy=milestone]").first().find("h4").should("exist")

      cy.get("[data-cy=milestone-carousel]")
        .find(".slider-control-centerright > button")
        .click()

      cy.get("[data-cy=milestone]").first().find("img").should("not.be.visible")
    })
    it("displays a timeline of milestones", () => {
      cy.get("[data-cy=milestone-timeline]").should("exist")
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

    it("displays some platforms", () => {
      cy.get("[data-cy=platform]").should($div => {
        expect($div, "2 platforms").to.have.length(2)
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
