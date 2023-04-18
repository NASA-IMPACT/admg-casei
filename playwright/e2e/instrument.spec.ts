const { test, expect } = require('@playwright/test');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe('Instrument', () => {

    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/instrument/ACAM');
    });

    test('explains the instrument', async ({ page }) => {
        // has a hero
        await expect(page.locator('[data-cy=instrument-hero] p')).toBeVisible();
        await expect(page.locator('[data-cy=instrument-hero] p')).toContainText('Instrument');

        const titleText = await page.textContent('[data-cy=instrument-hero] h1');
        expect(titleText).toContain('ACAM');
        expect(titleText).toContain('Airborne Compact Atmospheric Mapper');

        await expect(page.locator('[data-cy=instrument-hero] img')).toBeVisible();

        // displays an overview section
        await expect(page.locator('[data-cy=overview-section]')).toBeVisible();

        const inpageNavItems = await page.locator('[data-cy=inpage-nav] a');
        expect(await inpageNavItems.count()).toBe(4);
        await expect(inpageNavItems.nth(0)).toBeVisible();
        await expect(inpageNavItems.nth(1)).toContainText('Instrument Details');
        await expect(inpageNavItems.nth(2)).toContainText('Instrument Operation');
        await expect(inpageNavItems.nth(3)).toContainText('Data');

        // describes overview content
        await expect(page.locator('[data-cy=overview-section] h2')).toHaveText('Overview');
        await expect(page.locator('[data-cy=overview-section] h3')).toHaveText('Instrument Details');
        await expect(page.locator('[data-cy=instrument-definition-list]')).toBeVisible();
        await expect(page.locator('[data-cy=instrument-background]')).toBeVisible();
        await expect(page.locator('[data-cy=instrument-manufacturer-label]')).toBeVisible();
        await expect(page.locator('[data-cy=funding-source-label]')).toBeVisible();
        await expect(page.locator('[data-cy=data-locations-label]')).toBeVisible();
        await expect(page.locator('[data-cy=repositories-label]')).toBeVisible();

        const repositoryListItems = await page.locator('[data-cy=repository-list] li');
        expect(await repositoryListItems.count()).toBeGreaterThanOrEqual(1);

        await expect(page.locator('[data-cy=data-section]')).toBeVisible();
        await expect(page.locator('[data-cy=data-section] h2')).toHaveText('Data Products');

        const dataProductDivs = await page.locator('[data-cy=data-product]');
        expect(await dataProductDivs.count()).toBeGreaterThanOrEqual(1);

        await expect(dataProductDivs.nth(0).locator('[data-cy=doi-label]')).toBeVisible();
        await expect(dataProductDivs.nth(0).locator('[data-cy=doi-link]')).toBeVisible();

        await expect(page.locator('[data-cy=data-product-campaigns] [data-cy=doi-campaign-label]')).toHaveText('Campaigns');
        await expect(page.locator('[data-cy=data-product-platforms] [data-cy=doi-platform-label]')).toHaveText('Platforms');

        await expect(page.locator('[data-cy=entities-section]')).toBeVisible();
        await expect(page.locator('[data-cy=entities-section] h2')).toHaveText('Instrument Operation');

        await page.waitForSelector("[data-cy=entities-section] h2");
        const entitiesSectionTitle = await page.$eval("[data-cy=entities-section] h2", el => el.textContent);
        expect(entitiesSectionTitle).toContain("Instrument Operation");

        const instrumentRelatedEntitiesTable = await page.waitForSelector("[data-cy=instrument-related-entities-table] th");
        const ths = await instrumentRelatedEntitiesTable.$$("th");
        expect(await ths[0].innerText()).toContain("Platform");
        expect(await ths[1].innerText()).toContain("Campaigns");

        await page.waitForSelector("[data-cy=related-platform] big");
        await page.waitForSelector("[data-cy=related-campaign] big");
    });
});
