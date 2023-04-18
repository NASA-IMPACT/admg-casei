import { site } from '../../test/__fixtures__';
const { test, expect } = require('@playwright/test');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe('Footer', () => {

    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    })

    test('renders on all pages', async ({ page }) => {
        const urls = [
            '/',
            '/explore/campaigns',
            '/explore/platforms',
            '/explore/instruments',
            '/about',
            '/glossary',
            '/contact',
            '/campaign/SnowEx',
            '/platform/G-III',
            '/instrument/UAVSAR',
        ];

        for (const url of urls) {
            await page.goto(url);
            await expect(page.locator('[data-cy=page]').locator('[data-cy=page-footer]')).toBeVisible();
        }
    });

    test('has content', async ({ page }) => {
        await page.goto('/');

        await expect(page.locator('[data-cy=page-footer]').locator('[data-cy=footer-title]')).toHaveText(site.siteMetadata.shortname);
        await expect(page.locator('[data-cy=page-footer]').locator('[data-cy=footer-subtitle]')).toHaveText(site.siteMetadata.siteDefinition);

        await expect(page.locator('[data-cy=footer-explore]').locator('p')).toHaveText('Explore');
        await expect(page.locator('[data-cy=footer-campaigns-link]')).toHaveText('Campaigns');
        await expect(page.locator('[data-cy=footer-platforms-link]')).toHaveText('Platforms');
        await expect(page.locator('[data-cy=footer-instruments-link]')).toHaveText('Instruments');
    });
});
