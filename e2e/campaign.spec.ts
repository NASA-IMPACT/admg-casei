import { test, expect } from "@playwright/test"
import { delay } from "./utils"

test.beforeEach(async ({ page }) => {
  await page.goto("/campaign/OLYMPEX")
})

test.describe("Campaign Page", () => {
  //   test("matches snapshots", async ({ page }) => {
  //     await expect(page).toHaveScreenshot({ fullPage: false })
  //     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  //     await delay(500)
  //     await page.evaluate(() => window.scrollTo(0, -document.body.scrollHeight))
  //     await expect(page).toHaveScreenshot({ fullPage: true })
  //   })

  test("it provides information on the campaign", async ({ page }) => {
    const hero = page.locator("[data-cy=campaign-hero]")
    await expect(hero.locator("[data-cy=campaign-hero-header]")).toContainText(
      "Olympic Mountains Experiment"
    )
    const stats = hero.locator("[data-cy=stats]")
    // check stats labels
    await expect(stats.locator("dd")).toHaveCount(3)
    await expect(stats.locator("dd").nth(0)).toContainText("Deployment")
    await expect(stats.locator("dd").nth(1)).toContainText("Collection Periods")
    await expect(stats.locator("dd").nth(2)).toContainText("Data Products")

    //check that all stats values are integers
    await expect(stats.locator("dt")).toHaveCount(3)
    await expect(
      parseInt(await stats.locator("dt").nth(0).textContent())
    ).not.toBeNaN()
    await expect(
      parseInt(await stats.locator("dt").nth(1).textContent())
    ).not.toBeNaN()
    await expect(
      parseInt(await stats.locator("dt").nth(2).textContent())
    ).not.toBeNaN()
  })

  test("it provides navigation within the page", async ({ page }) => {
    const pageNav = page.locator("[data-cy=inpage-nav]")
    const expectedNavLabels = [
      "CASEI Logo",
      "OLYMPEX",
      "Overview",
      "Focus",
      "Platforms & Instruments",
      "Timeline",
      "Data",
      "Program Info",
    ]
    for (let i = 0; i < expectedNavLabels.length; i++) {
      await expect(pageNav.locator("a").nth(i)).toContainText(
        expectedNavLabels[i]
      )
    }

    for (let navId of [
      "program-info",
      "platform",
      "overview",
      "timeline",
      "focus",
    ]) {
      await page.locator(`[data-cy=${navId}-inpage-link]`).click()
      await expect(page.url().indexOf(navId)).toBeGreaterThan(-1)
    }
  })

  test("it fixes the in-page nav to the top of the viewport", async ({
    page,
  }) => {
    await expect(page.locator("[data-cy=inpage-nav]")).toBeVisible()
    // scroll to bottom of page and check that page nav is still visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator("[data-cy=inpage-nav]")).toBeVisible()
  })

  test("it should display an overview of the campaign", async ({ page }) => {
    const overviewSection = page.locator("[data-cy=overview-section]")
    await expect(overviewSection.locator("h3").first()).toContainText(
      "The Campaign"
    )
    await expect(overviewSection.locator("[data-cy=description]")).toBeVisible()

    // check labels of overview properties
    const expectedPropertyLabels = [
      "Study Dates",
      "Region",
      "Season of Study",
      "Spatial Bounds",
    ]
    for (let i = 0; i < expectedPropertyLabels.length; i++) {
      await expect(
        overviewSection.locator("[data-cy=overview-content] label").nth(i)
      ).toContainText(expectedPropertyLabels[i])
    }
  })

  test("it should display a list of external links", async ({ page }) => {
    const externalLinks = page.locator("[data-cy=link-list]")
    for (let externalLinkText of await externalLinks
      .locator("a")
      .allTextContents()) {
      await expect(externalLinkText).toContain("External Link")
    }
  })

  test("it should display additional notes", async ({ page }) => {
    await expect(page.locator("[data-cy=notes-public]")).not.toBeEmpty()
  })

  test("it should display a list of links to repositories", async ({
    page,
  }) => {
    const repoList = page.locator("[data-cy=repo-list]")
    for (let externalLinkText of await repoList
      .locator("a")
      .allTextContents()) {
      await expect(externalLinkText).toContain("External Link")
    }
  })

  test("it should display a Focus section", async ({ page }) => {
    const focusSection = page.locator("[data-cy=focus-section]")
    await focusSection.scrollIntoViewIfNeeded()

    await expect(focusSection.locator("h2").first()).toContainText("Focus")

    const expectedLabels = [
      "Focus Area",
      "Geophysical Concepts",
      "Focus Phenomena",
      "Supported NASA Missions",
    ]

    for (let i = 0; i < expectedLabels.length; i++) {
      await expect(
        focusSection
          .locator("[data-cy=focus-content]")
          .nth(i)
          .locator("[data-cy=focus-content-label]")
      ).toContainText(expectedLabels[i])
    }
  })

  test("it should link to related Focus Areas", async ({ page }) => {
    const focusAreas = page.locator("[data-cy=focus-area]")
    const numAreas = await focusAreas.count()

    // TODO: Check that this doesn't have weird behaviour. Seemed to come up
    // with a different focus area sometimes (Carbon Cycle instead of Weather)
    // link matches label of area
    for (let i = 0; i < numAreas; i++) {
      const focusAreaHref = await focusAreas.nth(i).getAttribute("href")
      const focusAreaLabel = await focusAreas
        .nth(i)
        .locator("label")
        .textContent()
      expect(focusAreaHref).toEqual(`/focus/${focusAreaLabel}`)

      // navigate to focus page
      await focusAreas.nth(i).click()
      await expect(page.locator("h1").first()).toContainText(focusAreaLabel)
      await page.goBack()
    }
  })

  test("it should link to related Campaigns filtered by Geophysical Concept", async ({
    page,
  }) => {
    const terrestrialHydrologyLink = page.locator(
      "[data-cy=geophysical-concept-link]",
      { hasText: "Terrestrial Hydrology" }
    )
    await terrestrialHydrologyLink.click()

    await expect(page.url()).toContain("/explore/campaigns")

    const filterChip = page.locator("[data-cy=filter-chip]")
    await expect(filterChip).toHaveCount(1)
    await expect(filterChip.first()).toContainText("geophysical: Terr Hydro")
  })
})

// describe("Campaign", () => {
//     before(() => {
//       cy.visit("/campaign/OLYMPEX")
//     })

//     it("provides information on the campaign", () => {

//       cy.url().should("include", "/campaign/")

//       cy.get("[data-cy=platform-section]").should("exist")

//       cy.get("[data-cy=platform-section]")
//         .find("h2")
//         .should("have.text", "Platforms & Instruments")

//       cy.get("[data-cy=platform-carousel]").find(".slider").should("exist")
//       cy.get("[data-cy=platform-carousel]").find(
//         ".slider-control-centerright > button"
//       )
//       cy.get("[data-cy=platforms-card]").should("exist")
//       cy.get("[data-cy=platforms-card]")
//         .find("[data-cy=shortname]")
//         .should("exist")
//       cy.get("[data-cy=platforms-card]")
//         .find("[data-cy=longname]")
//         .should("exist")
//       cy.get("[data-cy=instrument-accordion]")
//         .should("exist")
//         .find("[data-cy=accordion-button]")
//         .first()
//         .click()
//       cy.get("[data-cy=instrument-accordion-content]").find(
//         "[data-cy=instrument-accordion-image-description]"
//       )
//       cy.get("[data-cy=accordion-measurements-label]").should("exist")
//       cy.get("[data-cy=accordion-link]").should("exist").first().click()

//       cy.url().should("include", "instrument")
//       cy.go("back")

//       cy.get("[data-cy=carousel-list-text-control]")
//         .should("exist")
//         .first()
//         .should($div => {
//           expect($div, "2 or more instruments").to.have.length.gte(1)
//         })

//       cy.get("[data-cy=program-info-section]").should("exist")

//       cy.get("[data-cy=program-info-section]")
//         .find("h2")
//         .should("have.text", "Program Info")

//       cy.get("[data-cy=campaign-logo]").should("exist")

//       cy.get("[data-cy=program-info-content]").should($div => {
//         expect($div, "8 info items").to.have.length(8)
//       })
//       cy.get("[data-cy=program-info-content-label]").should($label => {
//         expect($label, "8 labels").to.have.length(8)
//       })
//       cy.get("[data-cy=program-info-content-text]").should($p => {
//         expect($p, "6 text entries").to.have.length.within(6, 8)
//       })
//       cy.get("[data-cy=program-info-content-link]").should($a => {
//         expect($a, "2 links").to.have.length.of.at.most(2)
//       })
//     })

//     describe.skip("the timeline section", () => {
//       before(() => {
//         cy.visit("/explore/campaigns")
//         cy.wait(0)
//         cy.get("[data-cy=campaigns-card]")
//           .find("big")
//           .contains("AirMOSS")
//           .parent()
//           .click()
//       })

//       it("displays a milestone carousel", () => {
//         cy.get("[data-cy=milestone-carousel]").find(".slider").should("exist")

//         cy.get("[data-cy=milestone]").first().find("label").should("exist")
//         cy.get("[data-cy=milestone]").first().find("svg").should("exist")
//         cy.get("[data-cy=milestone]").first().find("svg").should("be.visible")
//         cy.get("[data-cy=milestone]").first().find("h3").should("exist")
//         cy.get("[data-cy=milestone]").first().find("p").should("exist")

//         cy.get("[data-cy=milestone-carousel]")
//           .find(".slider-control-centerright > button")
//           .click()

//         cy.get("[data-cy=milestone]").first().find("svg").should("not.be.visible")

//         cy.get("[data-cy=milestone-timeline]").should("exist")
//         cy.get("[data-cy=milestone-timeline]").first().find("ol").should("exist")
//         cy.get("[data-cy=milestone-timeline]").first().find("li").should("exist")

//         cy.get("[data-cy=milestone-timeline-card]")
//           .should("exist")
//           .click({ multiple: true, force: true }) // needs to be forced in order to access the cards that exist outside of the window
//         cy.get("[data-cy=milestone-timeline-card]")
//           .first()
//           .find("svg")
//           .should("exist")
//       })
//     })

//     describe.skip("the data section", () => {
//       before(() => {
//         cy.visit("/explore/campaigns")
//         cy.wait(0)
//         cy.get("[data-cy=campaigns-card]")
//           .find("big")
//           .contains("CAMP2Ex")
//           .parent()
//           .click()
//       })

//       it("displays some data products", () => {
//         cy.get("[data-cy=data-section]").should("exist")

//         cy.get("[data-cy=data-section]")
//           .find("h2")
//           .should("have.text", "Data Products")

//         cy.get("[data-cy=data-product]").should($div => {
//           expect($div, "3 or more data products").to.have.length.gte(3)
//         })
//         cy.get("[data-cy=data-product]")
//           .first()
//           .find("[data-cy=doi-label]")
//           .should("exist")

//         cy.get("[data-cy=data-product]")
//           .first()
//           .find("[data-cy=doi-link]")
//           .should("exist")

//         cy.get("[data-cy=data-product-platforms]")
//           .first()
//           .find("[data-cy=doi-platform-label]")
//           .should("exist")
//           .and("have.text", "Platforms")

//         cy.get("[data-cy=data-product-instruments]")
//           .first()
//           .find("[data-cy=doi-instrument-label]")
//           .should("exist")
//           .and("have.text", "Instruments")
//       })
//     })
//   })
