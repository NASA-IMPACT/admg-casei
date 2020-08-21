/// <reference types="Cypress" />

describe("Explore", () => {
  beforeEach(() => {
    cy.visit("/explore/campaigns")
  })
  it("renders correctly", () => {
    cy.get("[data-cy=tabbar]")
      .find("li")
      .should($li => {
        expect($li).to.have.length(3)
      })
      .then($li => {
        expect($li[0], "text content").to.have.text("Campaigns")
        expect($li[1], "text content").to.have.text("Platforms")
        expect($li[2], "text content").to.have.text("Instruments")
      })

    cy.get("[data-cy=explore-tools]").should("exist")
    cy.get("[data-cy=item-count]").should("exist")
    cy.get("[data-cy=explore-card]").should("exist")
  })

  describe("campaigns", () => {
    it("displays the number of items to explore", () => {
      cy.get("[data-cy=item-count]")
        .invoke("text")
        .should("match", /Showing [0-9]+ campaigns/i)
    })

    it("displays a list of cards presenting the available campaigns", () => {
      cy.get("[data-cy=explore-card]")
        .find("big")
        .contains("AirMOSS")
        .parent()
        .parent() // is there a better way to select the AirMOSS card?
        .should($card => {
          expect($card.find("[data-cy=ongoing-tag]")).not.to.exist
          expect($card.find("[data-cy=shortname]")).to.have.text("AirMOSS")
          expect($card.find("[data-cy=longname]")).to.have.text(
            "Airborne Microwave Observatory of Subcanopy and Subsurface"
          )
          expect($card.find("[data-cy=daterange]")).to.have.text("2012—2015")
          expect($card.find("[data-cy=region]")).to.have.text("North America")

          expect($card.find("[data-cy=count1]")).to.contain("Deployments")
          expect($card.find("[data-cy=count2]")).to.contain("Data Products")
        })
    })

    it("navigates to the campaign page", () => {
      cy.get("[data-cy=explore-card]").find("big").contains("AirMOSS").click()

      cy.url().should("include", "/campaign/")

      cy.get("h1")
        .should("exist")
        .and(
          "have.text",
          "Airborne Microwave Observatory of Subcanopy and Subsurface"
        )
    })
  })

  describe("platforms", () => {
    beforeEach(() => {
      cy.get("[data-cy=tabbar]").contains("Platforms").click()
      cy.url().should("include", "/explore/platforms")
    })

    it("displays the number of items to explore", () => {
      cy.get("[data-cy=item-count]")
        .invoke("text")
        .should("match", /Showing [0-9]+ platforms/i)
    })

    it("displays a list of cards presenting the available platforms", () => {
      cy.get("[data-cy=explore-card]")
        .find("big")
        .contains("B-200")
        .parent()
        .parent() // is there a better way to select the card?
        .should($card => {
          expect($card.find("[data-cy=stationary-tag]")).not.to.exist
          expect($card.find("[data-cy=shortname]")).to.have.text("B-200")
          expect($card.find("[data-cy=longname]")).to.have.text(
            "Beechcraft King Air B-200"
          )
          expect($card.find("[data-cy=longname]")).to.exist

          expect($card.find("[data-cy=count1]")).to.contain("Campaign")
          expect($card.find("[data-cy=count2]")).to.contain(
            "Collection Periods"
          )
          expect($card.find("[data-cy=count3]")).to.contain("Instruments")
        })
    })
  })

  describe("instruments", () => {
    beforeEach(() => {
      cy.get("[data-cy=tabbar]").contains("Instruments").click()
      cy.url().should("include", "/explore/instruments")
    })

    it("displays the number of items to explore", () => {
      cy.get("[data-cy=item-count]")
        .invoke("text")
        .should("match", /Showing [0-9]+ instruments/i)
    })

    it("displays a list of cards presenting the available instruments", () => {
      cy.get("[data-cy=explore-card]")
        .find("big")
        .contains("AMS")
        .parent()
        .parent() // is there a better way to select the card?
        .should($card => {
          expect($card.find("[data-cy=shortname]")).to.have.text("AMS")
          expect($card.find("[data-cy=longname]")).to.have.text(
            "Aerosol Mass Spectrometer"
          )
          expect($card.find("[data-cy=longname]")).to.exist

          expect($card.find("[data-cy=count1]")).to.contain("Campaigns")
        })
    })
  })
})
