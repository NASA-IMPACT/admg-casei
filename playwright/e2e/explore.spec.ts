const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');

test.describe('Explore', () => {
    let browser, page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.beforeEach(async () => {
        page = await browser.newPage();
    });

    test.afterEach(async () => {
        await page.close();
    });

    test.describe('campaigns', () => {
        test.beforeEach(async () => {
            await page.goto('/explore/campaigns');
            await page.waitForSelector('[data-cy=h1-campaigns]');
            expect(await page.textContent('[data-cy=h1-campaigns]')).toEqual('Explore campaigns');
            expect(await page.isVisible('[data-cy=h1-campaigns]')).toBe(false);
        });

        test('displays campaign cards and navigates to the selected campaign', async ({ page }) => {
            const tabs = await page.$$('[data-cy=tabbar] a');
            expect(tabs.length).toBe(3);

            expect(await tabs[0].textContent()).toContain('Campaigns');
            expect(await tabs[0].style('fontWeight')).toBe('700');
            expect(await tabs[1].textContent()).toContain('Platforms');
            expect(await tabs[1].style('fontWeight')).not.toBe('700');
            expect(await tabs[2].textContent()).toContain('Instruments');
            expect(await tabs[2].style('fontWeight')).not.toBe('700');

            await expect(page.locator('[data-cy=explore-tools]')).toBeVisible();
            await expect(page.locator('[data-cy=campaigns-count]')).toBeVisible();
            await expect(page.locator('[data-cy=campaigns-card]')).toBeVisible();

            const campaignsCountText = await page.locator('[data-cy=campaigns-count]').textContent();
            expect(campaignsCountText).toMatch(/[0-9]+/i);

            await page.locator('[data-cy=explore-input]').type('CPEX-AW');
            await page.keyboard.press('Enter');

            const cpexAWCard = page.locator('[data-cy=campaigns-card] big:has-text("CPEX-AW")').ancestor('div');
            expect(await cpexAWCard.locator('[data-cy=shortname]').textContent()).toContain('CPEX-AW');
            expect(await cpexAWCard.locator('[data-cy=longname]').textContent()).toContain('Convective Processes Experiment – Aerosols & Winds');
            expect(await cpexAWCard.locator('[data-cy=daterange]').textContent()).toContain('2021');
            expect(await cpexAWCard.locator('[data-cy=region]').textContent()).toContain('St. Croix, U.S. Virgin Islands; Western Atlantic and Caribbean Sea');

            const footer = await page.locator('[data-cy=campaigns-card-footer]');
            expect(await footer.locator('[data-cy=count1]').textContent()).toContain('Deployment');
            expect(await footer.locator('[data-cy=count2]').textContent()).toContain('Data Product');

            await page.locator('[data-cy=explore-input]').type('OMG');
            await page.keyboard.press('Enter');

            const omgCard = page.locator('[data-cy=campaigns-card] big:has-text("OMG")').ancestor('div');
            expect(await omgCard.locator('[data-cy=ongoing-tag]').isVisible()).toBe(true);
            expect(await omgCard.locator('[data-cy=shortname]').textContent()).toContain('OMG');
            expect(await omgCard.locator('[data-cy=daterange]').textContent()).toContain('Ongoing');

            await page.locator('[data-cy=explore-input]').fill('CPEX-AW');
            await page.keyboard.press('Enter');

            await cpexAWCard.click();

            expect(await page.url()).toContain('/campaign/');
            expect(await page.locator('h1').textContent()).toBe('Convective Processes Experiment – Aerosols & Winds');
        });

    });

    test.describe('platforms', () => {
        test.beforeEach(async () => {
            await page.goto('/explore/platforms');
            await page.waitForSelector('[data-cy=h1-platforms]');
            expect(await page.textContent('[data-cy=h1-platforms]')).toEqual('Explore platforms');
            expect(await page.isVisible('[data-cy=h1-platforms]')).toBe(false);
        });

        test('displays platform cards and navigates to the selected platform', async ({ page }) => {
            const tabs = await page.$$('[data-cy=tabbar] a');
            expect(tabs.length).toBe(3);

            expect(await tabs[0].textContent()).toContain('Campaigns');
            expect(await tabs[0].style('fontWeight')).not.toBe('700');
            expect(await tabs[1].textContent()).toContain('Platforms');
            expect(await tabs[1].style('fontWeight')).toBe('700');
            expect(await tabs[2].textContent()).toContain('Instruments');
            expect(await tabs[2].style('fontWeight')).not.toBe('700');

            await expect(page.locator('[data-cy=explore-tools]')).toBeVisible();
            await expect(page.locator('[data-cy=platforms-count]')).toBeVisible();
            await expect(page.locator('[data-cy=platforms-card]')).toBeVisible();

            const platformsCountText = await page.locator('[data-cy=platforms-count]').textContent();
            expect(platformsCountText).toMatch(/[0-9]+/i);

            const b200Card = page.locator('[data-cy=platforms-card] big:has-text("B-200")').ancestor('div');
            expect(await b200Card.locator('[data-cy=stationary-tag]').isVisible()).toBe(false);
            expect(await b200Card.locator('[data-cy=shortname]').textContent()).toContain('B-200');
            expect(await b200Card.locator('[data-cy=longname]').textContent()).toContain('Beechcraft B-200 King Air');
            expect(await b200Card.locator('[data-cy=longname]')).toBeVisible();

            const footer = await page.locator('[data-cy=platforms-card-footer]');
            expect(await footer.locator('[data-cy=count1]').textContent()).toContain('Campaigns');
            expect(await footer.locator('[data-cy=count2]').textContent()).toContain('Instruments');

            const ghCard = page.locator('[data-cy=platforms-card] big:has-text("GH")').ancestor('div');
            await ghCard.click();

            expect(await page.url()).toContain('/platform/');
            expect(await page.locator('h1').textContent()).toBe('GHGlobal Hawk');
        });

    });

    test.describe('instruments', () => {
        test.beforeEach(async () => {
            await page.goto('/explore/instruments');
            await page.waitForSelector('[data-cy=h1-instruments]');
            expect(await page.textContent('[data-cy=h1-instruments]')).toEqual('Explore instruments');
            expect(await page.isVisible('[data-cy=h1-instruments]')).toBe(false);
        });

        test('displays instrument cards and navigates to the selected instrument', async ({ page }) => {
            const tabs = await page.$$('[data-cy=tabbar] a');
            expect(tabs.length).toBe(3);

            expect(await tabs[0].textContent()).toContain('Campaigns');
            expect(await tabs[0].style('fontWeight')).not.toBe('700');
            expect(await tabs[1].textContent()).toContain('Platforms');
            expect(await tabs[1].style('fontWeight')).not.toBe('700');
            expect(await tabs[2].textContent()).toContain('Instruments');
            expect(await tabs[2].style('fontWeight')).toBe('700');

            await expect(page.locator('[data-cy=explore-tools]')).toBeVisible();
            await expect(page.locator('[data-cy=instruments-count]')).toBeVisible();
            await expect(page.locator('[data-cy=instruments-card]')).toBeVisible();

            const instrumentsCountText = await page.locator('[data-cy=instruments-count]').textContent();
            expect(instrumentsCountText).toMatch(/[0-9]+/i);

            const hamsrCard = page.locator('[data-cy=instruments-card] big:has-text("HAMSR")').ancestor('div');
            expect(await hamsrCard.locator('[data-cy=shortname]').textContent()).toContain('HAMSR');
            expect(await hamsrCard.locator('[data-cy=longname]').textContent()).toContain('High Altitude Monolithic Microwave integrated Circuit(MMIC) Sounding Radiometer');
            expect(await hamsrCard.locator('[data-cy=longname]')).toBeVisible();

            const footer = await page.locator('[data-cy=instruments-card-footer]');
            expect(await footer.locator('[data-cy=count1]').textContent()).toContain('Campaigns');

            const acamCard = page.locator('[data-cy=instruments-card] big:has-text("ACAM")').ancestor('div');
            await acamCard.click();

            expect(await page.url()).toContain('/instrument/');
            expect(await page.locator('h1').textContent()).toContain('ACAM');
        });
    });
});
