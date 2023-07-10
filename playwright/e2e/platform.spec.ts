const { test, expect } = require("@playwright/test")
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe("Platform", () => {
  let page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(baseUrl)
  })

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/platform/DC-8`)
  })

  test("explains the platform", async ({ page }) => {
    await page.waitForSelector("[data-cy=platform-hero]")
    const platformHero = await page.$("[data-cy=platform-hero]")

    // Check platform name
    const platformName = await platformHero.$eval("h1", el => el.textContent)
    expect(platformName).toContain("Douglas DC-8")

    // Check platform image
    const platformImage = await platformHero.$("img")
    expect(platformImage).toBeTruthy()
    expect(await platformImage.isVisible()).toBeTruthy()

    // Check platform stats
    const statsList = await platformHero.$("[data-cy=stats]")
    const statsItems = await statsList.$$("dd")
    expect(statsItems.length).toBe(2)
    expect(await statsItems[0].textContent()).toContain("Campaigns")
    expect(await statsItems[1].textContent()).toContain("Data Products")

    // Check inpage nav
    const inpageNav = await page.$("[data-cy=inpage-nav]")
    const inpageNavLinks = await inpageNav.$$("a")
    expect(inpageNavLinks.length).toBe(4)
    expect(await inpageNavLinks[0].isVisible()).toBeTruthy()
    expect(await inpageNavLinks[1].textContent()).toContain("Overview")
    expect(await inpageNavLinks[2].textContent()).toContain(
      "Related Campaigns & Instruments"
    )
    expect(await inpageNavLinks[3].textContent()).toContain("Data")

    // Check overview section
    const overviewSection = await page.$("[data-cy=overview-section]")
    expect(await overviewSection.isVisible()).toBeTruthy()
    expect(await overviewSection.$eval("h2", el => el.textContent)).toContain(
      "Overview"
    )
    expect(await overviewSection.$eval("h3", el => el.textContent)).toContain(
      "Overview"
    )
    const linkList = await overviewSection.$("[data-cy=link-list]")
    const linkListItems = await linkList.$$("li")
    expect(linkListItems.length).toBeGreaterThanOrEqual(0)
    expect(await overviewSection.$("p")).toBeTruthy()

    // Check data section
    const dataSection = await page.$("[data-cy=data-section]")
    expect(await dataSection.isVisible()).toBeTruthy()
    expect(await dataSection.$eval("h2", el => el.textContent)).toContain(
      "Data Products"
    )
    const dataProducts = await dataSection.$$("[data-cy=data-product]") // returns a list of elementHandles

    expect(await dataProducts).toHaveLength(dataProducts.length)

    const doiLabel = dataProducts[0].$("[data-cy=doi-label]")
    const doiLink = dataProducts[0].$("[data-cy=doi-link]")
    expect(doiLabel).toBeTruthy()
    expect(doiLink).toBeTruthy()
    const campaignsLabel = await dataProducts[0].$(
      "[data-cy=doi-campaign-label]"
    )
    const instrumentsLabel = await dataProducts[0].$(
      "[data-cy=doi-instrument-label]"
    )
    expect(campaignsLabel).toBeTruthy()
    expect(await campaignsLabel.textContent()).toContain("Campaigns")
    expect(instrumentsLabel).toBeTruthy()
    expect(await instrumentsLabel.textContent()).toContain("Instruments")

    await page.waitForSelector("[data-cy=campaigns-instruments-section] h2", {
      visible: true,
    })
    expect(
      await page.$eval(
        "[data-cy=campaigns-instruments-section] h2",
        el => el.textContent
      )
    ).toContain("Related Campaigns & Instruments")

    await page.waitForSelector("[data-cy=campaign-carousel] .slider")
    await page.waitForSelector("[data-cy=campaigns-card]")
    await page.click("[data-cy=campaigns-card]:first-child")
    await page.waitForURL(/campaign/)
    await page.goBack()

    await page.waitForSelector(
      "[data-cy=campaign-carousel] .slider-control-centerright > button"
    )

    await page.waitForSelector("[data-cy=instrument-accordion]", {
      visible: true,
    })
    await page.click(
      "[data-cy=instrument-accordion] [data-cy=accordion-button]:first-child"
    )
    await page.waitForSelector(
      "[data-cy=instrument-accordion-content] [data-cy=instrument-accordion-image-description]"
    )
    await page.waitForSelector("[data-cy=accordion-measurements-label]")
    await page.waitForSelector("[data-cy=accordion-link]")
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-cy=accordion-link]:first-child"),
    ])
    expect(page.url()).toContain("instrument")
    await page.goBack()
  })
})
