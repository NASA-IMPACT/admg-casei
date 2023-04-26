const { test, expect } = require('@playwright/test');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL;

test.describe('Glossary', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl + '/glossary');
    });

    test('displays the glossary', async () => {
        await expect(page.locator('css=[data-cy=main-glossary]').locator('h1')).toHaveText('Glossary');

        for (const letter of ['C', 'D', 'P']) {
            const sections = await page.locator(`[data-cy=${letter}-section]`).elementHandles();

            for (const _section of sections) {
                await expect(page.locator('h3')).toBeVisible();
                await expect(page.locator('p')).toBeVisible();
            }
        }

        const listItemCount = await page.locator('[data-cy=glossary-definition-note').count();
        expect(listItemCount).toBeGreaterThanOrEqual(1);

        await expect(page.locator('[data-cy=glossary-img-section]').first().locator('img')).toBeVisible();
    });
});
