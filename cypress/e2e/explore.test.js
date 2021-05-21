/// <reference types="Cypress" />

describe("Explore", () => {
  describe("campaigns", () => {
    before(() => {
      cy.visit("/explore/campaigns")
      cy.get("[data-cy=h1-campaigns]")
        .should("have.text", "Explore campaigns")
        .and("not.be.visible")
    })

    it("displays campaign cards and navigates to the selected campaign", () => {
      cy.get("[data-cy=tabbar]")
        .find("a")
        .should($tabs => {
          expect($tabs).to.have.length(3)
        })
        .then($tabs => {
          expect($tabs[0], "text content").to.contain("Campaigns")
          expect($tabs[0], "Campaigns weight is bold").to.have.css(
            "font-weight",
            "700"
          )
          expect($tabs[1], "text content").to.contain("Platforms")
          expect($tabs[1], "Platforms weight is not bold").not.to.have.css(
            "font-weight",
            "700"
          )
          expect($tabs[2], "text content").to.contain("Instruments")
          expect($tabs[2], "Instruments weight is not bold").not.to.have.css(
            "font-weight",
            "700"
          )
        })

      cy.get("[data-cy=explore-tools]").should("exist")
      cy.get("[data-cy=campaigns-count]").should("exist")
      cy.get("[data-cy=campaigns-card]").should("exist")

      cy.get("[data-cy=campaigns-count]")
        .invoke("text")
        .should("match", /[0-9]+/i)

      cy.get("[data-cy=campaigns-card]")
        .find("big")
        .contains("AirMOSS")
        .parent()
        .parent() // is there a better way to select the AirMOSS card?
        .should($card => {
          expect($card.find("[data-cy=ongoing-tag]")).not.to.exist
          expect($card.find("[data-cy=shortname]")).to.contain("AirMOSS")
          expect($card.find("[data-cy=longname]")).to.contain(
            "Airborne Microwave Observatory of Subcanopy and Subsurface"
          )
          expect($card.find("[data-cy=daterange]")).to.contain("2012—2015")
          expect($card.find("[data-cy=region]")).to.contain("North America")
        })

      cy.get("[data-cy=campaigns-card-footer]")
        .should("exist")
        .should($small => {
          expect($small.find("[data-cy=count1]")).to.exist.contain("Deployment")
          expect($small.find("[data-cy=count2]")).to.contain("Data Product")
        })

      cy.get("[data-cy=campaigns-card]") // test ongoing campaign card
        .find("big")
        .contains("OMG")
        .parent()
        .parent()
        .should($card => {
          expect($card.find("[data-cy=ongoing-tag]")).to.exist
          expect($card.find("[data-cy=shortname]")).to.contain("OMG")
          expect($card.find("[data-cy=daterange]")).to.contain("Ongoing")
        })

      cy.get("[data-cy=campaigns-card]")
        .find("big")
        .contains("AirMOSS")
        .parent()
        .parent()
        .click()

      cy.url().should("include", "/campaign/")

      cy.get("h1").should(
        "have.text",
        "Airborne Microwave Observatory of Subcanopy and Subsurface"
      )
    })
  })

  describe("platforms", () => {
    before(() => {
      cy.visit("/explore/platforms")
      cy.get("[data-cy=h1-platforms]")
        .should("have.text", "Explore platforms")
        .and("not.be.visible")
    })

    it("displays platform cards and navigates to the selected platform", () => {
      cy.get("[data-cy=tabbar]")
        .find("a")
        .should($tabs => {
          expect($tabs).to.have.length(3)
        })
        .then($tabs => {
          expect($tabs[0], "text content").to.contain("Campaigns")
          expect($tabs[0], "Campaigns weight is not bold").not.to.have.css(
            "font-weight",
            "700"
          )
          expect($tabs[1], "text content").to.contain("Platforms")
          expect($tabs[1], "Platforms weight is bold").to.have.css(
            "font-weight",
            "700"
          )
          expect($tabs[2], "text content").to.contain("Instruments")
          expect($tabs[2], "Instruments weight is not bold").not.to.have.css(
            "font-weight",
            "700"
          )
        })

      cy.get("[data-cy=explore-tools]").should("exist")
      cy.get("[data-cy=platforms-count]").should("exist")
      cy.get("[data-cy=platforms-card]").should("exist")

      cy.get("[data-cy=platforms-count]")
        .invoke("text")
        .should("match", /[0-9]+/i)

      cy.get("[data-cy=platforms-card]")
        .find("big")
        .contains("B-200")
        .parent()
        .parent()
        .should($card => {
          expect($card.find("[data-cy=stationary-tag]")).not.to.exist
          expect($card.find("[data-cy=shortname]")).to.contain("B-200")
          expect($card.find("[data-cy=longname]")).to.contain(
            "Beechcraft King Air B-200"
          )
          expect($card.find("[data-cy=longname]")).to.exist
        })

      cy.get("[data-cy=platforms-card-footer]")
        .should("exist")
        .should($small => {
          expect($small.find("[data-cy=count1]")).to.contain("Campaigns")
          expect($small.find("[data-cy=count2]")).to.contain("Instruments")
        })

      cy.get("[data-cy=platforms-card]")
        .find("big")
        .contains("GH")
        .parent()
        .parent()
        .click()

      cy.url().should("include", "/platform/")

      cy.get("h1").should("have.text", "GHGlobal Hawk UAV")
    })
  })

  describe("instruments", () => {
    before(() => {
      cy.visit("/explore/instruments")
      cy.get("[data-cy=h1-instruments]")
        .should("have.text", "Explore instruments")
        .and("not.be.visible")
    })

    it("displays instrument cards and navigates to the selected instrument", () => {
      cy.get("[data-cy=tabbar]")
        .find("a")
        .should($tabs => {
          expect($tabs).to.have.length(3)
        })
        .then($tabs => {
          expect($tabs[0], "text content").to.contain("Campaigns")
          expect($tabs[0], "Campaigns weight is not bold").not.to.have.css(
            "font-weight",
            "700"
          )
          expect($tabs[1], "text content").to.contain("Platforms")
          expect($tabs[1], "Platforms weight is not bold").not.to.have.css(
            "font-weight",
            "700"
          )
          expect($tabs[2], "text content").to.contain("Instruments")

          expect($tabs[2], "Instruments weight is bold").to.have.css(
            "font-weight",
            "700"
          )
        })

      cy.get("[data-cy=explore-tools]").should("exist")
      cy.get("[data-cy=instruments-count]").should("exist")
      cy.get("[data-cy=instruments-card]").should("exist")

      cy.get("[data-cy=instruments-count]")
        .invoke("text")
        .should("match", /[0-9]+/i)

      cy.get("[data-cy=instruments-card]")
        .find("big")
        .contains("HAMSR")
        .parent()
        .parent()
        .should($card => {
          expect($card.find("[data-cy=shortname]")).to.contain("HAMSR")
          expect($card.find("[data-cy=longname]")).to.contain(
            "High Altitude Monolithic Microwave integrated Circuit(MMIC) Sounding Radiometer"
          )
          expect($card.find("[data-cy=longname]")).to.exist
        })

      cy.get("[data-cy=instruments-card-footer]")
        .should("exist")
        .should($small => {
          expect($small.find("[data-cy=count1]")).to.contain("Campaigns")
        })
      cy.get("[data-cy=instruments-card]")

      cy.get("[data-cy=instruments-card]")
        .find("big")
        .contains("CPL")
        .parent()
        .parent()
        .click()

      cy.url().should("include", "/instrument/")

      cy.get("h1").should("contain", "CPL")
    })
  })
})
