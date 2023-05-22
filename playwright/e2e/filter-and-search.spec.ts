const { test, expect } = require('@playwright/test');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

// TODO - cards data-cy names seem to have changed. We should check to see if page elements are still being targeted by name in a fashion that enables this test to be effective

test.describe('Filter, Search and Sort', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl + '/explore/campaigns');
    });

    test('should not reload on button click nor type and enter', async ({ page }) => {
        const beforeReload = await page.evaluate(() => window.performance.navigation.type);
        expect(beforeReload).toEqual(0);

        await page.click('[data-cy=map-toggle-btn]');
        await page.waitForSelector('[data-cy=mapboxgl-map]');
        await page.click('[data-cy=map-toggle-btn]');
        await page.waitForSelector('[data-cy=mapboxgl-map]', { state: 'detached' });

        const afterReload = await page.evaluate(() => window.performance.navigation.type);
        expect(afterReload).toEqual(0);

        await page.type('[data-cy=explore-input]', 'submitting some text');
        await page.keyboard.press('Enter');

        const afterEnter = await page.evaluate(() => window.performance.navigation.type);
        expect(afterEnter).toEqual(0);
    });

    // Create separate test.describe for each category: campaigns, platforms, and instruments
    test.describe('campaigns', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(baseUrl + '/explore/campaigns');
        });

        // Implement filter test for campaigns
        test('filter campaigns', async ({ page }) => {
            const initialCardCount = await page.$$eval('[data-cy=campaigns-card]', cards => cards.length);
            await page.click('[data-cy=focus-filter-select]');
            await page.click('[data-cy=filter-options] >> text=Weather');
            await page.click('[data-cy=submit]');

            const filteredCardCount = await page.$$eval('[data-cy=campaigns-card]', cards => cards.length);
            expect(filteredCardCount).toBeLessThan(initialCardCount);
        });


        // Implement clear all filters test for campaigns
        test('clear all campaigns', async ({ page }) => {
            await page.click('[data-cy=focus-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Weather');
            await page.click('[data-cy=geophysical-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Clouds');
            await page.click('[data-cy=clear-filters]');

            const filterChips = await page.$$('.filter-chip');
            expect(filterChips.length).toBe(0);
        });


        // Implement sort test for campaigns
        test('sort campaigns', async ({ page }) => {
            await page.click('[data-cy=sort-select]');
            await page.click('[data-cy=sort-option] >> text=A TO Z');

            const sortedAscCampaignNames = await page.$$eval('[data-cy=campaign-card] big', campaigns =>
                campaigns.map(campaign => campaign.textContent)
            );
            expect(sortedAscCampaignNames).toEqual([...sortedAscCampaignNames].sort());

            await page.click('[data-cy=sort-select]');
            await page.click('[data-cy=sort-option] >> text=Z TO A');

            const sortedDescCampaignNames = await page.$$eval('[data-cy=campaign-card] big', campaigns =>
                campaigns.map(campaign => campaign.textContent)
            );
            expect(sortedDescCampaignNames).toEqual([...sortedDescCampaignNames].sort().reverse());
        });

    });

    test.describe('platforms', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(baseUrl + '/explore/platforms');
        });

        // Implement filter test for platforms
        test('filter platforms', async ({ page }) => {
            const initialCardCount = await page.$$eval('[data-cy=platforms-card]', cards => cards.length);

            await page.click('[data-cy=instrument-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Aerolaser');
            await page.click('[data-cy=submit]');

            const filteredCardCount = await page.$$eval('[data-cy=platforms-card]', cards => cards.length);
            expect(filteredCardCount).toBeLessThan(initialCardCount);
        });




        // Implement clear all filters test for platforms
        test('clear all platforms', async ({ page }) => {
            await page.click('[data-cy=instrument-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Aerolaser');
            await page.click('[data-cy=instrument-filter-select]');
            await page.click('[data-cy=filter-option] >> text=CPL');
            await page.click('[data-cy=clear-filters]');

            const filterChips = await page.$$('.filter-chip');
            expect(filterChips.length).toBe(0);
        });



        test('sort platforms', async ({ page }) => {
            await page.click('[data-cy=sort-select]');
            await page.click('[data-cy=sort-option] >> text=A TO Z');

            const sortedAscPlatformNames = await page.$$eval('[data-cy=platform-card] big', platforms =>
                platforms.map(platform => platform.textContent)
            );
            expect(sortedAscPlatformNames).toEqual([...sortedAscPlatformNames].sort());

            await page.click('[data-cy=sort-select]');
            await page.click('[data-cy=sort-option] >> text=Z TO A');

            const sortedDescPlatformNames = await page.$$eval('[data-cy=platform-card] big', platforms =>
                platforms.map(platform => platform.textContent)
            );
            expect(sortedDescPlatformNames).toEqual([...sortedDescPlatformNames].sort().reverse());
        });

    });

    test.describe('instruments', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(baseUrl + '/explore/instruments');
        });

        // Implement filter test for instruments
        test('filter instruments', async ({ page }) => {
            const initialCardCount = await page.$$eval('[data-cy=instruments-card]', cards => cards.length);

            await page.click('[data-cy=type-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Multi');
            await page.click('[data-cy=submit]');

            const filteredCardCount = await page.$$eval('[data-cy=instruments-card]', cards => cards.length);
            expect(filteredCardCount).toBeLessThan(initialCardCount);
        });

        // Implement clear all filters test for instrument
        test('clear all instruments', async ({ page }) => {
            await page.click('[data-cy=type-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Multi');
            await page.click('[data-cy=vertical-filter-select]');
            await page.click('[data-cy=filter-option] >> text=Stratosphere');
            await page.click('[data-cy=clear-filters]');

            const filterChips = await page.$$('.filter-chip');
            expect(filterChips.length).toBe(0);
        });

        // Implement sort test for instruments
        test('sort instruments', async ({ page }) => {
            await page.click('[data-cy=sort-select]');
            await page.click('[data-cy=sort-option] >> text=A TO Z');

            const sortedAscInstrumentNames = await page.$$eval('[data-cy=instrument-card] big', instruments =>
                instruments.map(instrument => instrument.textContent)
            );
            expect(sortedAscInstrumentNames).toEqual([...sortedAscInstrumentNames].sort());

            await page.click('[data-cy=sort-select]');
            await page.click('[data-cy=sort-option] >> text=Z TO A');

            const sortedDescInstrumentNames = await page.$$eval('[data-cy=instrument-card] big', instruments =>
                instruments.map(instrument => instrument.textContent)
            );
            expect(sortedDescInstrumentNames).toEqual([...sortedDescInstrumentNames].sort().reverse());
        });
    });
});
