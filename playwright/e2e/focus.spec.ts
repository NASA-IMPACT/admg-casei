const { test, expect } = require('@playwright/test');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe('Focus Area', () => {

    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/focus/Global%20Water%20&%20Energy%20Cycle');
    });

    test('explains the focus area Global Water & Energy Cycle', async ({ page }) => {
        await expect(page.locator('[data-cy=focus-hero]').first().locator('p')).toHaveText('Focus Area');

        await expect(page.locator('[data-cy=focus-hero]').first().locator('h1')).toHaveText('Global Water & Energy Cycle');

        const inPageNavItems = await page.locator('[data-cy=inpage-nav]').locator('a');
        await expect(inPageNavItems).toHaveCount(4);
        await expect(inPageNavItems.nth(0)).toBeVisible();
        await expect(inPageNavItems.nth(1)).toHaveText('Overview');
        await expect(inPageNavItems.nth(2)).toHaveText('Related Campaigns');
        await expect(inPageNavItems.nth(3)).toHaveText('Focus Areas');

        await expect(page.locator('[data-cy=overview-section]')).toBeVisible();

        await expect(page.locator('[data-cy=overview-section]').locator('h2')).toHaveText('Overview');

        await expect(page.locator('[data-cy=description]')).toBeVisible();

        await expect(page.locator('[data-cy=focus-link]')).toHaveAttribute('href', /water-and-energy-cycle/);

        const focusAreas = await page.locator('[data-cy=focus-areas-section]').locator('[data-cy=focus-area]');
        await expect(focusAreas).toHaveCount(6);

        for (let i = 0; i < 6; i++) {
            await expect(focusAreas.nth(i).locator('svg')).toBeVisible();
            await expect(focusAreas.nth(i).locator('label')).toHaveText(await focusAreas.nth(i).innerText());
        }

        await page.locator('[data-cy=focus-areas-section]').locator('[data-cy=focus-area] >> text=Weather').click();

        expect(page.url()).toContain('/focus/');

        await expect(page.locator('h1')).toHaveText(/Weather/);
    });
});
