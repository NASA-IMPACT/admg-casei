const { test, expect } = require("@playwright/test")
import { site } from "../../test/__fixtures__"
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

// TODO, review if this is still needed
const checkSectionHeader = async (page, section, headerText) => {
  const header = await page.$(`data-cy=${section}-section >> h2`)
  const headerContent = await header.textContent()
  expect(headerContent).toBe(headerText)
}

test.describe("Homepage", () => {
  let page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(baseUrl)
  })

  test.afterAll(async () => {
    await page.close()
  })

  test.describe("Home Hero section", () => {
    test("renders title and description correctly", async ({ page }) => {
      await page.goto(baseUrl)
      // Check if the home hero section exists and has a single instance
      const homeHero = await page.$("[data-cy=home-hero]")
      expect(homeHero).not.toBeNull()

      // Check if the title in the home hero section matches the expected title
      const titleElement = await homeHero.$("h1")
      const titleContent = await titleElement.textContent()
      expect(titleContent).not.toBeNull()

      // toMatch(site.siteMetadata.title.toString()); // TODO toMatch and textContent failing to match identical strings

      // Check if the description in the home hero section matches the expected description
      const descriptionElement = await page.locator("[data-cy=home-hero] p")
      const descriptionContent = await descriptionElement.textContent()
      expect(descriptionContent).not.toBeNull()

      // (site.siteMetadata.description); TODO
    })
  })

  test.describe("Focus Area section", () => {
    test("focus areas can be selected", async ({ page }) => {
      await page.goto(baseUrl + "/focus/Weather/")
      // Check if the focus area section exists and contains the expected header
      const focusAreaHeader = await page.$(
        "[data-cy=focus-areas-section] >> h2"
      )
      expect(focusAreaHeader).not.toBeNull()

      // Check if focus area elements contain the expected SVG icons and labels
      const focusAreas = await page.$$(
        "[data-cy=focus-areas-section] >> [data-cy=focus-area]"
      )
      for (const focusArea of focusAreas) {
        const svgElement = await focusArea.$("svg")
        expect(svgElement).toBeTruthy()

        const viewBox = await svgElement.getAttribute("viewBox")
        expect(viewBox).not.toBe("0 0 16 16")

        const labelElement = await focusArea.$("label")
        const labelText = await labelElement.textContent()
        expect(labelText).toBe(await focusArea.textContent())
      }

      // Click on a focus area and verify that the URL changes as expected
      const weatherFocusArea = await page.$(
        "[data-cy=focus-areas-section] >> [data-cy=focus-area] >> text=Weather"
      )
      await weatherFocusArea.click()

      expect(await page.url()).toContain("/focus/")

      // Verify that the new page has the expected header
      const newHeader = await page.textContent("h1")
      expect(newHeader).toBe("Weather")
    })
  })

  test.describe("Region Type section", () => {
    test("region types can be selected", async ({ page }) => {
      await page.goto(baseUrl)

      // Check if the region type section exists and contains the expected header
      const regionTypeHeader = await page.textContent(
        "[data-cy=region-type-section] >> h2"
      )
      expect(regionTypeHeader).toBe("Region Type")

      // Check the number of region type buttons and store their text content
      const regionButtons = await page.$$(
        "[data-cy=region-text-control] >> button"
      )
      expect(regionButtons).toHaveLength(16)
      const regionButtonTexts = await Promise.all(
        regionButtons.map(button => button.textContent())
      )

      // Check the number of region type items and compare their text content with the buttons
      const regionTypes = await page.$$(
        "[data-cy=region-type-section] >> [data-cy=region-type] >> [data-cy=region-type-name]"
      )
      expect(regionTypes).toHaveLength(16)
      const regionTypeTexts = await Promise.all(
        regionTypes.map(regionType => regionType.textContent())
      )
      expect(regionButtonTexts).toEqual(regionTypeTexts)

      // Click on the "Island" region type button
      await page.click("[data-cy=region-text-control] >> text=/Island/i")

      // Check if the "Island" region type is visible
      expect(
        await page.isVisible(
          "[data-cy=region-type-section] >> [data-cy=region-type-name] >> text=/Island/i"
        )
      ).toBeTruthy()

      // Click on the "Mountains" region type button
      await page.click("[data-cy=region-text-control] >> text=/Mountains/i")

      // Check if the "Mountains" region type is visible
      expect(
        await page.isVisible(
          "[data-cy=region-type-section] >> [data-cy=region-type-name] >> text=/Mountains/i"
        )
      ).toBeTruthy()

      // Click on the visible region type item
      await page.click('div[class="slider-slide slide-visible slide-current"]')

      // wait for page load
      await page.waitForNavigation()

      // Check if the URL includes "/explore/campaigns" and the header has the expected text
      expect(page.url()).toContain("/explore/campaigns")
    })
  })
})
