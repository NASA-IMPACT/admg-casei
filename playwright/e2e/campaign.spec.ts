const { test, expect } = require("@playwright/test")
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe("Campaign", () => {
  let page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(baseUrl + "/campaign/OLYMPEX")
  })

  test("provides information on the campaign", async () => {
    const hero = await page.$("[data-cy=campaign-hero] h1");
    await expect(hero).toBeTruthy();
    await expect(page.locator("[data-cy=campaign-hero] h1")).toBeVisible()
    await expect(page.locator("[data-cy=campaign-hero-header]")).toHaveCount(1)

    const statsItems = await page.locator(
      "[data-cy=campaign-hero] [data-cy=stats] dd"
    )
    await expect(statsItems).toHaveCount(3)
    await expect(statsItems.nth(0)).toContainText("Deployment")
    await expect(statsItems.nth(1)).toContainText("Platforms")
    await expect(statsItems.nth(2)).toContainText("Data Products")

    const statsValues = await page.locator(
      "[data-cy=campaign-hero] [data-cy=stats] dt"
    )
    await expect(statsValues).toHaveCount(3)
    await expect(statsValues.nth(0)).toContainText("1")
    await expect(statsValues.nth(1)).toContainText("8")
    await expect(statsValues.nth(2)).toBeVisible()

    await expect(page.locator("[data-cy=mapboxgl-map]")).toBeVisible()

    const inpageNavItems = await page.locator("[data-cy=inpage-nav] a")
    await expect(inpageNavItems).toHaveCount(7)
    await expect(inpageNavItems.nth(0)).toBeVisible()
    await expect(inpageNavItems.nth(1)).toContainText("Overview")
    await expect(inpageNavItems.nth(2)).toContainText("Focus")
    await expect(inpageNavItems.nth(3)).toContainText("Platforms & Instruments")
    await expect(inpageNavItems.nth(4)).toContainText("Deployment & Events")
    await expect(inpageNavItems.nth(5)).toContainText("Data")
    await expect(inpageNavItems.nth(6)).toContainText("Program Info")

    const sectionIds = [
      "program-info",
      "platform",
      "overview",
      "deployment",
      "focus",
    ]

    for (const id of sectionIds) {
      await page.locator(`[data-cy=${id}-inpage-link]`).click()
      await expect(page.url()).toContain(id)

      // TODO: figure out how to properly test the inpage scroll
      await expect(page.locator(`[data-cy=${id}-section] h2`)).toBeVisible()
    }
  })

  // ... additional test may need to be added to cover any changes made to this format page, such as search capability
})
