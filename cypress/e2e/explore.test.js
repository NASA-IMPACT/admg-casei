/// <reference types="Cypress" />

describe("Explore", () => {
  describe("campaigns", () => {
    before(() => {
      cy.visit("/explore")
      cy.get("h1")
        .should("have.text", "Explore campaigns")
        .and("not.be.visible")
    })

    it("displays campaign cards and navigates to the selected campaign", () => {
      cy.get("[data-cy=tabbar]")
        .find("li")
        .should($li => {
          expect($li).to.have.length(3)
        })
        .then($li => {
          expect($li[0], "text content").to.contain("Campaigns")
          expect($li[0].firstChild, "Campaigns link is blue").to.have.css(
            "color",
            "rgb(170, 201, 255)"
          )
          expect($li[1], "text content").to.contain("Platforms")
          expect(
            $li[1].firstChild,
            "Platforms link is not blue"
          ).not.to.have.css("color", "rgb(170, 201, 255)")
          expect($li[2], "text content").to.contain("Instruments")

          expect(
            $li[2].firstChild,
            "Instruments link is not blue"
          ).not.to.have.css("color", "rgb(170, 201, 255)")
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

          expect($card.find("[data-cy=count1]")).to.contain("Deployments")
          expect($card.find("[data-cy=count2]")).to.contain("Data Products")
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

      cy.get("[data-cy=campaigns-card]").find("big").contains("AirMOSS").click()

      cy.url().should("include", "/campaign/")

      cy.get("h1").should(
        "have.text",
        "Airborne Microwave Observatory of Subcanopy and Subsurface"
      )
    })
  })

  describe("platforms", () => {
    before(() => {
      cy.visit("/explore")
      cy.get("h1")
        .should("have.text", "Explore campaigns")
        .and("not.be.visible")
      cy.get("[data-cy=tabbar]").contains("button", "Platforms").click()
    })

    it("displays platform cards and navigates to the selected platform", () => {
      cy.get("h1")
        .should("have.text", "Explore platforms")
        .and("not.be.visible")

      cy.get("[data-cy=tabbar]")
        .find("li")
        .should($li => {
          expect($li).to.have.length(3)
        })
        .then($li => {
          expect($li[0], "text content").to.contain("Campaigns")
          expect(
            $li[0].firstChild,
            "Campaigns link is not blue"
          ).not.to.have.css("color", "rgb(170, 201, 255)")
          expect($li[1], "text content").to.contain("Platforms")
          expect($li[1].firstChild, "Platforms link is blue").to.have.css(
            "color",
            "rgb(170, 201, 255)"
          )
          expect($li[2], "text content").to.contain("Instruments")
          expect(
            $li[2].firstChild,
            "Instruments link is not blue"
          ).not.to.have.css("color", "rgb(170, 201, 255)")
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
        .parent() // is there a better way to select the card?
        .should($card => {
          expect($card.find("[data-cy=stationary-tag]")).not.to.exist
          expect($card.find("[data-cy=shortname]")).to.contain("B-200")
          expect($card.find("[data-cy=longname]")).to.contain(
            "Beechcraft King Air B-200"
          )
          expect($card.find("[data-cy=longname]")).to.exist

          expect($card.find("[data-cy=count1]")).to.contain("Campaign")
          expect($card.find("[data-cy=count2]")).to.contain(
            "Collection Periods"
          )
          expect($card.find("[data-cy=count3]")).to.contain("Instruments")
        })

      cy.get("[data-cy=platforms-card]").find("big").contains("GH").click()

      cy.url().should("include", "/platform/")

      cy.get("h1").should("have.text", "Global Hawk UAV")
    })
  })

  describe("instruments", () => {
    before(() => {
      cy.visit("/explore")
      cy.get("h1")
        .should("have.text", "Explore campaigns")
        .and("not.be.visible")
      cy.get("[data-cy=tabbar]").contains("button", "Instruments").click()
    })

    it("displays instrument cards and navigates to the selected instrument", () => {
      cy.get("h1")
        .should("have.text", "Explore instruments")
        .and("not.be.visible")

      cy.get("[data-cy=tabbar]")
        .find("li")
        .should($li => {
          expect($li).to.have.length(3)
        })
        .then($li => {
          expect($li[0], "text content").to.contain("Campaigns")
          expect(
            $li[0].firstChild,
            "Campaigns link is not blue"
          ).not.to.have.css("color", "rgb(170, 201, 255)")
          expect($li[1], "text content").to.contain("Platforms")
          expect(
            $li[1].firstChild,
            "Platforms link is not blue"
          ).not.to.have.css("color", "rgb(170, 201, 255)")
          expect($li[2], "text content").to.contain("Instruments")

          expect($li[2].firstChild, "Instruments link is blue").to.have.css(
            "color",
            "rgb(170, 201, 255)"
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
        .parent() // is there a better way to select the card?
        .should($card => {
          expect($card.find("[data-cy=shortname]")).to.contain("HAMSR")
          expect($card.find("[data-cy=longname]")).to.contain(
            "High Altitude Monolithic Microwave integrated Circuit(MMIC) Sounding Radiometer"
          )
          expect($card.find("[data-cy=longname]")).to.exist

          expect($card.find("[data-cy=count1]")).to.contain("Campaigns")
        })

      cy.get("[data-cy=instruments-card]").find("big").contains("CPL").click()

      cy.url().should("include", "/instrument/")

      cy.get("h1").should("have.text", "CPL")
    })
  })
})
