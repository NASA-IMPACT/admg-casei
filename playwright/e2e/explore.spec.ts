const { chromium } = require("@playwright/test")
const { test, expect } = require("@playwright/test")
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe("Explore", () => {
  let browser, page

  test.beforeAll(async () => {
    browser = await chromium.launch()
    page = await browser.newPage()
    await page.goto(baseUrl)
  })

  test.afterAll(async () => {
    await browser.close()
  })

  test.beforeEach(async () => {
    page = await browser.newPage()
  })

  test.afterEach(async () => {
    await page.close()
  })

  test.describe("campaigns", () => {
    // test.beforeEach(async () => {
    //     await page.goto(baseUrl + '/explore/campaigns');
    //     // await page.waitForSelector('[data-cy=h1-campaigns]', { visible: true });
    //     expect(await page.textContent('[data-cy=h1-campaigns]')).toEqual('Explore campaigns');
    //     expect(await page.isVisible('[data-cy=h1-campaigns]')).toBe(true);
    // });

    test("displays campaign cards and navigates to the selected campaign", async ({
      page,
    }) => {
      // eval page
      await page.goto(baseUrl + "/explore/campaigns")
      const tabs = await page.$$("[data-cy=tabbar] a")
      expect(tabs.length).toBe(4)

      // check with computed values instead
      expect(await tabs[0].textContent()).toContain("Campaigns")
      expect(
        await tabs[0].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).toBe("700")
      expect(await tabs[1].textContent()).toContain("Platforms")
      expect(
        await tabs[1].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).not.toBe("700")
      expect(await tabs[2].textContent()).toContain("Instruments")
      expect(
        await tabs[2].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).not.toBe("700")

      // check only the first element for tools, campaigns, and card
      await expect(
        page.locator("[data-cy=explore-tools]").first()
      ).toBeVisible()
      await expect(
        page.locator("[data-cy=campaigns-count]").first()
      ).toBeVisible()
      await expect(
        page.locator("[data-cy=campaigns-card]").first()
      ).toBeVisible()

      const campaignsCountText = await page
        .locator("[data-cy=campaigns-count]")
        .textContent()
      expect(campaignsCountText).toMatch(/[0-9]+/i)

      await page.locator("[data-cy=explore-input]").type("CPEX-AW")
      await page.keyboard.press("Enter")

      const cpexAWCard = page
        .locator('[data-cy=campaigns-card] big:has-text("CPEX-AW")')
        .locator("xpath=..") // TODO need a better way to select parent to avoid tests breaking

      expect(
        await cpexAWCard.locator("[data-cy=shortname]").textContent()
      ).toContain("CPEX-AW")
      expect(
        await cpexAWCard.locator("[data-cy=longname]").textContent()
      ).toContain("Convective Processes Experiment – Aerosols & Winds")
      expect(
        await cpexAWCard.locator("[data-cy=daterange]").textContent()
      ).toContain("2021")
      expect(
        await cpexAWCard.locator("[data-cy=region]").textContent()
      ).toContain(
        "St. Croix, U.S. Virgin Islands; Western Atlantic and Caribbean Sea"
      )

      await page.waitForSelector("[data-cy=campaigns-card-footer]", {
        visible: true,
      }) // select only the visible element.toBeVisible();
      const footer = await page
        .locator("[data-cy=campaigns-card-footer]")
        .first()
      expect(await footer.locator("[data-cy=count1]").textContent()).toContain(
        "Deployment"
      )
      expect(await footer.locator("[data-cy=count2]").textContent()).toContain(
        "Data Product"
      )

      await page.locator("[data-cy=explore-input]").type("OMG")
      await page.keyboard.press("Enter")

      const omgCard = page
        .locator('[data-cy=campaigns-card] big:has-text("OMG")')
        .locator("xpath=..") // TODO
      expect(await omgCard.locator("[data-cy=ongoing-tag]").isVisible()).toBe(
        false
      ) // exist but not visible
      expect(
        await omgCard.locator("[data-cy=shortname]").textContent()
      ).toContain("OMG")
      expect(await omgCard.locator("[data-cy=daterange]").isVisible())

      await page.locator("[data-cy=explore-input]").fill("CPEX-AW")
      await page.keyboard.press("Enter")

      // await cpexAWCard.click(); TODO Revisit click as playwright does not ACK page context change
      // expect(await page.url()).toMatch('/campaign');

      await page.goto(baseUrl + "/campaign/CPEX-AW")
      expect(await page.locator("h1").textContent()).toBe(
        "Convective Processes Experiment – Aerosols & Winds"
      )
    })
  })

  test.describe("platforms", () => {
    // test.beforeEach(async () => {
    //     // await page.goto(baseUrl + '/explore/platforms');
    //     // await page.waitForSelector('[data-cy=h1-platforms]', { visible: true });
    //     expect(await page.textContent('[data-cy=h1-platforms]')).toEqual('Explore platforms');
    //     expect(await page.isVisible('[data-cy=h1-platforms]')).toBe(true);
    // });

    test("displays platform cards and navigates to the selected platform", async ({
      page,
    }) => {
      // eval page
      await page.goto(baseUrl + "/explore/platforms")
      const tabs = await page.$$("[data-cy=tabbar] a")
      expect(tabs.length).toBe(4)

      // check with computed values instead
      expect(await tabs[0].textContent()).toContain("Campaigns")
      expect(
        await tabs[0].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).not.toBe("700")
      expect(await tabs[1].textContent()).toContain("Platforms")
      expect(
        await tabs[1].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).toBe("700")
      expect(await tabs[2].textContent()).toContain("Instruments")
      expect(
        await tabs[2].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).not.toBe("700")

      // check only the first element for tools, campaigns, and card
      await expect(
        page.locator("[data-cy=explore-tools]").first()
      ).toBeVisible()
      await expect(
        page.locator("[data-cy=platforms-count]").first()
      ).toBeVisible()
      await expect(
        page.locator("[data-cy=platforms-card]").first()
      ).toBeVisible()

      const platformsCountText = await page
        .locator("[data-cy=platforms-count]")
        .textContent()
      expect(platformsCountText).toMatch(/[0-9]+/i)

      const b200Card = page
        .locator('[data-cy=platforms-card] big:has-text("B-200")')
        .locator("xpath=..") // TODO
      expect(
        await b200Card.locator("[data-cy=stationary-tag]").isVisible()
      ).toBe(false)
      expect(
        await b200Card.locator("[data-cy=shortname]").textContent()
      ).toContain("B-200")
      expect(
        await b200Card.locator("[data-cy=longname]").textContent()
      ).toContain("Beechcraft B-200 King Air")
      expect(await b200Card.locator("[data-cy=longname]")).toBeVisible()

      await page.waitForSelector("[data-cy=platforms-card-footer]", {
        visible: true,
      })
      const footer = await page
        .locator("[data-cy=platforms-card-footer]")
        .first()
      expect(await footer.locator("[data-cy=count1]").textContent()).toContain(
        "Campaigns"
      )
      expect(await footer.locator("[data-cy=count2]").textContent()).toContain(
        "Instruments"
      )

      // const ghCard = page.locator('[data-cy=platforms-card] big:has-text("GH")').locator('xpath=..'); // TODO
      // await ghCard.click(); // TODO

      // expect(await page.url()).toMatch('.*\/platform\/.*');
      await page.goto(baseUrl + "/platform/GH")
      expect(await page.locator("h1").textContent()).toBe("GHGlobal Hawk")
    })
  })

  test.describe("instruments", () => {
    // test.beforeEach(async () => {
    //     // await page.goto(baseUrl + '/explore/instruments');
    //     // await page.waitForSelector('[data-cy=h1-instruments]', { visible: true });
    //     expect(await page.textContent('[data-cy=h1-instruments]')).toEqual('Explore instruments');
    //     expect(await page.isVisible('[data-cy=h1-instruments]')).toBe(true);
    // });

    test("displays instrument cards and navigates to the selected instrument", async ({
      page,
    }) => {
      // eval page
      await page.goto(baseUrl + "/explore/instruments")
      const tabs = await page.$$("[data-cy=tabbar] a")
      expect(tabs.length).toBe(4)

      // check with computed values instead
      expect(await tabs[0].textContent()).toContain("Campaigns")
      expect(
        await tabs[0].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).not.toBe("700")
      expect(await tabs[1].textContent()).toContain("Platforms")
      expect(
        await tabs[1].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).not.toBe("700")
      expect(await tabs[2].textContent()).toContain("Instruments")
      expect(
        await tabs[2].evaluate(tab => window.getComputedStyle(tab).fontWeight)
      ).toBe("700")

      // check only the first element for tools, instruments, and card
      await expect(
        page.locator("[data-cy=explore-tools]").first()
      ).toBeVisible()
      await expect(
        page.locator("[data-cy=instruments-count]").first()
      ).toBeVisible()
      await expect(
        page.locator("[data-cy=instruments-card]").first()
      ).toBeVisible()

      const instrumentsCountText = await page
        .locator("[data-cy=instruments-count]")
        .textContent()
      expect(instrumentsCountText).toMatch(/[0-9]+/i)

      const hamsrCard = page
        .locator('[data-cy=instruments-card] big:has-text("HAMSR")')
        .locator("xpath=..") // TODO
      expect(
        await hamsrCard.locator("[data-cy=shortname]").textContent()
      ).toContain("HAMSR")
      expect(
        await hamsrCard.locator("[data-cy=longname]").textContent()
      ).toContain(
        "High Altitude Monolithic Microwave integrated Circuit (MMIC) Sounding Radiometer"
      )

      await page.waitForSelector("[data-cy=instruments-card-footer]", {
        visible: true,
      }) // select only the visible element.toBeVisible();
      const footer = await page
        .locator("[data-cy=instruments-card-footer]")
        .first()
      expect(await footer.locator("[data-cy=count1]").textContent()).toContain(
        "Campaigns"
      )

      const acamCard = page
        .locator('[data-cy=instruments-card] big:has-text("ACAM")')
        .locator("xpath=..") // TODO
      await acamCard.click() // TODO

      // expect(await page.url()).toMatch('.*\/instrument\/.*');

      await page.goto(baseUrl + "/instrument/ACAM")
      expect(await page.locator("h1").textContent()).toContain("ACAM")
    })
  })
})
