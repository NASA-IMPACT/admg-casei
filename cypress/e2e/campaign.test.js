/// <reference types="Cypress" />

describe("Campaign", () => {
  before(() => {
    cy.visit("/campaign/6d179d67-ebd8-5750-9f5d-dc55c92697b9")
  })

  describe("the header", () => {
    it("displays the short name", () => {
      cy.get("main").find("header").find("p").contains("ABoVE").should("exist")
    })

    it("displays the long name as title", () => {
      cy.get("main")
        .find("header")
        .find("h1")
        .contains("Arctic-Boreal Vulnerability Experiment")
        .should("exist")
    })

    it("displays the focus area as subtitle", () => {
      cy.get("main")
        .find("header")
        .find("p")
        .contains("Carbon Cycle & Ecosystems, Climate Variability & Change")
        .should("exist")
    })
    it("displays 3 big numbers", () => {
      cy.get("main")
        .find("header")
        .find("[data-cy=stats]")
        .find("dd")
        .should($stat => {
          expect($stat, "3 items").to.have.length(3)
          expect($stat.eq(0), "first item").to.contain("Deployments")
          expect($stat.eq(1), "second item").to.contain("Flights")
          expect($stat.eq(2), "third item").to.contain("Data Products")
        })
    })
    it("displays a map", () => {
      cy.get("main")
        .find("header")
        .find("[data-cy=overview-map]")
        .should("exist")
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
          expect($anchor, "5 items").to.have.length(5)
          expect($anchor.eq(0), "first item").to.contain("Overview")
          expect($anchor.eq(1), "second item").to.contain("Milestones")
          expect($anchor.eq(2), "third item").to.contain(
            "Platforms & Instruments"
          )
          expect($anchor.eq(3), "fourth item").to.contain("Data")
          expect($anchor.eq(4), "last item").to.contain("Resources")
        })
    })

    it("navigates to the inpage section", () => {
      cy.get("[data-cy=resources-section]").find("h2").should("be.visible")
      cy.get("[data-cy=resources-section]")
        .find("h2")
        .should("not.be.inViewport")

      cy.get("main").find("nav").find("a").last().click()

      cy.url().should("include", "#resources")
      cy.get("[data-cy=resources-section]").find("h2").should("be.inViewport")
    })

    it("all template sections should have the class 'inpage-nav'", () => {
      cy.get("main")
        .find("section")
        .each($section => {
          expect($section).to.have.class("inpage-nav")
        })
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

    it("displays word lists", () => {
      cy.get("[data-cy=word-list]")
        .find("label")
        .should($label => {
          expect($label, "2 items").to.have.length(2)

          expect($label.eq(0), "first item").to.contain("Focus Phenomena")
          expect($label.eq(1), "first item").to.contain("Science Keywords")
        })
    })
  })

  describe("the platforms section", () => {
    it("exists", () => {
      cy.get("[data-cy=platforms-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=platforms-section]")
        .find("h2")
        .should("have.text", "Platforms & Instruments")
    })

    it("displays some platforms", () => {
      cy.get("[data-cy=platform]").should($div => {
        expect($div, "5 platforms").to.have.length(5)
      })
    })
  })

  describe("the resources section", () => {
    it("exists", () => {
      cy.get("[data-cy=resources-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=resources-section]")
        .find("h2")
        .should("have.text", "Additional Information")
    })

    it("displays the logo", () => {
      cy.get("[data-cy=campaign-logo]").should("exist")
    })

    it("displays some infos", () => {
      cy.get("[data-cy=info-item]").should($div => {
        expect($div, "9 info items").to.have.length(9)
      })
    })
  })
})
