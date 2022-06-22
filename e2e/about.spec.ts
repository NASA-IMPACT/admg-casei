import { test, expect } from "@playwright/test"
import { delay } from "./utils"

test.beforeEach(async ({ page }) => {
  await page.goto("/about")
})

test.describe("About Page", () => {
  test("matches snapshots", async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: false })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await delay(500)
    await page.evaluate(() => window.scrollTo(0, -document.body.scrollHeight))
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test("renders the expected elements", async ({ page }) => {
    const hero = page.locator("[data-cy=about-hero]")
    await expect(hero).toBeVisible()
    await expect(hero).toContainText("About")
    await expect(hero.locator("h1")).toContainText("NASA")

    // inventory section
    const inventorySection = page.locator("[data-cy=about-inventory-section]")
    await expect(inventorySection).toBeVisible()
    await expect(
      inventorySection.locator("[data-cy=about-inventory-section-header]")
    ).toBeVisible()
    await expect(
      inventorySection.locator("[data-cy=about-inventory-section-header]")
    ).toContainText("Airborne Inventory")

    await expect(page.locator("[data-cy=about-inventory-label]")).toBeVisible()
    const inventoryObjectives = page.locator(
      "[data-cy=about-inventory-objectives]"
    )
    await expect(inventoryObjectives).toBeVisible()

    const objectiveList = inventoryObjectives.locator("div")

    await expect(objectiveList).toHaveCount(3)
    await expect(objectiveList.nth(0)).toContainText("Detailed Accounting")
    await expect(objectiveList.nth(1)).toContainText("Enhanced Metadata")
    await expect(objectiveList.nth(2)).toContainText("Improve Discovery")

    // image break
    await expect(page.locator("[data-cy=about-image-section]")).toBeVisible()

    // motivation section
    const motivationSection = page.locator("[data-cy=about-motivation-section]")
    await expect(
      motivationSection.locator("[data-cy=about-motivation-label]")
    ).toContainText("Why it Matters")
    await expect(
      motivationSection.locator("[data-cy=about-motivation-headline]")
    ).toContainText("A centralized data discovery tool")
    const motivationText = page.locator("[data-cy=about-motivation-text]")
    await expect(motivationText).toBeVisible()
    await expect(motivationText.locator("p")).toHaveCount(2)

    // organization section
    const organizationSection = page.locator(
      "[data-cy=about-organization-section]"
    )
    await expect(
      organizationSection.locator("[data-cy=about-organization-label]")
    ).toContainText("Responsible Organization")
    await expect(
      organizationSection.locator("[data-cy=about-organization-headline]")
    ).toContainText("ADMG’s primary goal")
    await expect(
      page.locator("[data-cy=about-organization-text] > p")
    ).toHaveCount(1)
  })
})
