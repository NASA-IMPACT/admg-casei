const { test, expect } = require("@playwright/test")
import config from "../playwright.config"
import { site } from "../../test/__fixtures__"

const baseUrl = config.use?.baseURL

test.describe("Header", () => {
  let page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(baseUrl)
  })

  test("renders correctly", async () => {
    // disable this header test for temporary release banner
    // await expect(page.locator("header")).toHaveText(
    //   site.siteMetadata.headerType
    // )

    const nasaLogo = page.locator("[data-cy=nasa-logo]")
    await expect(nasaLogo).toHaveAttribute(
      "alt",
      "NASA's red, white and blue insignia, nicknamed the 'meatball'"
    )

    const navItems = await page.locator("nav").locator("li")
    await expect(navItems).toHaveCount(7)

    await expect(navItems.nth(0)).toHaveText("Explore")
    await expect(navItems.nth(2)).toHaveText("Glossary")
    await expect(navItems.nth(3)).toHaveText("FAQ")
    // await expect(navItems.nth(4)).toHaveText("User Guide")
    await expect(navItems.nth(5)).toHaveText("About")
    await expect(navItems.nth(6)).toHaveText("Contact")
  })
})
