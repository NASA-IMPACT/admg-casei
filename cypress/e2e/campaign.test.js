/// <reference types="Cypress" />

describe("Campaign", () => {
  before(() => {
    cy.visit("/explore")
    cy.get("[data-cy=campaigns-card]").find("big").contains("OLYMPEX").click()
  })

  it("provides information on the campaign", () => {
    // cy.get("[data-cy=campaign-hero]").find("p").should("exist")

    cy.get("[data-cy=campaign-hero]").find("h1").should("exist")
    cy.get("[data-cy=campaign-hero-header]").should("have.length", 1)

    cy.get("[data-cy=campaign-hero]")
      .find("[data-cy=stats]")
      .find("dd")
      .should($stat => {
        expect($stat, "3 items").to.have.length(3)
        expect($stat.eq(0), "first item").to.contain("Deployment")
        expect($stat.eq(1), "second item").to.contain("Collection Periods")
        expect($stat.eq(2), "third item").to.contain("Data Products")
      })

    cy.get("[data-cy=campaign-hero]")
      .find("[data-cy=stats]")
      .find("dt")
      .should($stat => {
        expect($stat, "3 items").to.have.length(3)
        expect($stat.eq(0), "first item").to.contain("1")
        expect($stat.eq(1), "second item").to.contain("58")
        expect($stat.eq(2), "third item").to.contain("36")
      })

    cy.get("[data-cy=mapboxgl-map]").should("exist")

    cy.get("[data-cy=inpage-nav]").find("[data-cy=home-link]").should("exist")
    cy.get("[data-cy=home-link]").click()

    cy.url().should("eq", "http://localhost:8000/")
    cy.go("back")

    cy.get("[data-cy=inpage-nav]")
      .find("a")
      .should($anchor => {
        expect($anchor, "10 items").to.have.length(10)
        expect($anchor.eq(0), "first item").to.contain("CASEI Logo")
        expect($anchor.eq(1), "second item").to.exist
        expect($anchor.eq(2), "third item").to.contain("Overview")
        expect($anchor.eq(3), "fourth item").to.contain("Missions")
        expect($anchor.eq(4), "fifth item").to.contain("Focus")
        expect($anchor.eq(5), "sixth item").to.contain(
          "Platforms & Instruments"
        )
        expect($anchor.eq(6), "seventh item").to.contain("Timeline")
        expect($anchor.eq(7), "eigth item").to.contain("Data")
        expect($anchor.eq(8), "ninth item").to.contain("Program Info")
        expect($anchor.eq(9), "tenth item").to.contain("Other")
      })
    ;["program-info", "platform", "overview", "timeline", "focus"].forEach(
      id => {
        cy.get(`[data-cy=${id}-inpage-link]`).click()

        cy.url().should("include", id)

        // TODO: figure out how to properly test the inpage scroll
        cy.get(`[data-cy=${id}-section]`).find("h2").should("be.inViewport")
      }
    )

    cy.get("[data-cy=overview-section]").should("exist")

    cy.get("[data-cy=overview-section]")
      .find("h2")
      .should("have.text", "Overview")
      .and("not.be.visible")

    cy.get("[data-cy=overview-section]")
      .find("h3")
      .first()
      .should("have.text", "The Campaign")
      .and("be.visible")

    cy.get("[data-cy=aliases]").should("not.exist") // OLYMPEX does not have any aliases listed

    cy.get("[data-cy=description]").should("exist")

    cy.get("[data-cy=overview-content]")
      .find("label")
      .should($label => {
        expect($label, "4 items").to.have.length(4)

        expect($label.eq(0), "first item").to.contain("Study dates")
        expect($label.eq(1), "first item").to.contain("Region")
        expect($label.eq(2), "first item").to.contain("Season of Study")
        expect($label.eq(3), "first item").to.contain("Spatial bounds")
      })

    cy.get("[data-cy=link-list]").find("li").should("have.length.within", 2, 5)

    cy.get("[data-cy=link-list]")
      .find("[data-cy=doi-link]")
      .should("exist")
      .and("have.text", "http://dx.doi.org/10.5067/GPMGV/OLYMPEX/DATA101")

    cy.get("[data-cy=notes-public]").should("exist")
    cy.get("[data-cy=repo-list]").should("exist")
    cy.get("[data-cy=repo-list]")
      .find("li")
      .should($li => {
        expect($li, "at least 1").to.have.length.gte(1)
      })

    cy.get("[data-cy=missions-section]").should("exist")
    cy.get("[data-cy=linked-mission]").should($div => {
      expect($div, "2 missions").to.have.length(2)
    })

    cy.get("[data-cy=focus-section]").should("exist")

    cy.get("[data-cy=focus-section]").find("h2").should("have.text", "Focus")

    cy.get("[data-cy=focus-content]").should($div => {
      expect($div, "3 info items").to.have.length(3)
    })
    cy.get("[data-cy=focus-content-label]").should($label => {
      expect($label, "3 labels").to.have.length(3)
    })
    cy.get("[data-cy=geophysical-concept-chip]").should("exist")
    cy.get("[data-cy=focus-phenomena-chip]").should("exist")

    cy.get("[data-cy=focus-section]")
      .find("[data-cy=focus-area]")
      .contains("Weather")
      .click()

    cy.url().should("include", "/focus/")

    cy.get("h1").should("contain", "Weather")

    cy.go("back")

    cy.get("[data-cy=focus-section]")
      .find("[data-cy=geophysical-concept]")
      .contains("Hydrology")
      .click()

    cy.url().should("include", "/explore")

    cy.get("[data-cy=filter-chip]")
      .should("have.length", 1)
      .and("have.text", "geophysical: Terr Hydro")

    cy.get("[data-cy=campaigns-card]").should("have.length", 4)

    cy.go("back")

    cy.url().should("include", "/campaign/")

    cy.get("[data-cy=platform-section]").should("exist")

    cy.get("[data-cy=platform-section]")
      .find("h2")
      .should("have.text", "Platforms & Instruments")

    cy.get("[data-cy=platform-carousel]").find(".slider").should("exist")
    cy.get("[data-cy=platform-carousel]").find(
      ".slider-control-centerright > button"
    )
    cy.get("[data-cy=platforms-card]").should("exist")
    cy.get("[data-cy=platforms-card]")
      .find("[data-cy=shortname]")
      .should("exist")
    cy.get("[data-cy=platforms-card]")
      .find("[data-cy=longname]")
      .should("exist")
    cy.get("[data-cy=instrument-accordion]")
      .should("exist")
      .find("[data-cy=accordion-button]")
      .first()
      .click()
    cy.get("[data-cy=instrument-accordion-content]").should("exist").find("img")
    cy.get("[data-cy=instrument-accordion-content]").find(
      "[data-cy=instrument-accordion-image-description]"
    )
    cy.get("[data-cy=accordion-measurements-label]").should("exist")
    cy.get("[data-cy=accordion-link]").should("exist").first().click()

    cy.url().should("include", "instrument")
    cy.go("back")

    cy.get("[data-cy=carousel-list-text-control]")
      .should("exist")
      .first()
      .should($div => {
        expect($div, "2 or more instruments").to.have.length.gte(1)
      })

    cy.get("[data-cy=program-info-section]").should("exist")

    cy.get("[data-cy=program-info-section]")
      .find("h2")
      .should("have.text", "Program Info")

    cy.get("[data-cy=campaign-logo]").should("exist")

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

  describe("the timeline section", () => {
    before(() => {
      cy.visit("/explore")
      cy.get("[data-cy=campaigns-card]").find("big").contains("AirMOSS").click()
    })

    it("displays a milestone carousel", () => {
      cy.get("[data-cy=milestone-carousel]").find(".slider").should("exist")

      cy.get("[data-cy=milestone]").first().find("label").should("exist")
      cy.get("[data-cy=milestone]").first().find("svg").should("exist")
      cy.get("[data-cy=milestone]").first().find("svg").should("be.visible")
      cy.get("[data-cy=milestone]").first().find("h3").should("exist")
      cy.get("[data-cy=milestone]").first().find("p").should("exist")

      cy.get("[data-cy=milestone-carousel]")
        .find(".slider-control-centerright > button")
        .click()

      cy.get("[data-cy=milestone]").first().find("svg").should("not.be.visible")

      cy.get("[data-cy=milestone-timeline]").should("exist")
      cy.get("[data-cy=milestone-timeline]").first().find("ol").should("exist")
      cy.get("[data-cy=milestone-timeline]").first().find("li").should("exist")

      cy.get("[data-cy=milestone-timeline-card]")
        .should("exist")
        .click({ multiple: true, force: true }) // needs to be forced in order to access the cards that exist outside of the window
      cy.get("[data-cy=milestone-timeline-card]")
        .first()
        .find("svg")
        .should("exist")
    })
  })

  describe("the data section", () => {
    before(() => {
      cy.visit("/explore")
      cy.get("[data-cy=campaigns-card]").find("big").contains("GCPEx").click()
    })

    it("displays some data products", () => {
      cy.get("[data-cy=data-section]").should("exist")

      cy.get("[data-cy=data-section]")
        .find("h2")
        .should("have.text", "Data Products")

      cy.get("[data-cy=data-product]").should($div => {
        expect($div, "3 or more data products").to.have.length.gte(3)
      })
      cy.get("[data-cy=data-product]")
        .first()
        .find("[data-cy=doi-label]")
        .should("exist")

      cy.get("[data-cy=data-product]")
        .first()
        .find("[data-cy=doi-link]")
        .should("exist")

      cy.get("[data-cy=data-product-platforms]")
        .first()
        .find("[data-cy=doi-platform-label]")
        .should("exist")
        .and("have.text", "Platforms")

      cy.get("[data-cy=data-product-instruments]")
        .first()
        .find("[data-cy=doi-instrument-label]")
        .should("exist")
        .and("have.text", "Instruments")
    })
  })
})
