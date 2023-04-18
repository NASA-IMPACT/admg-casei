const { test, expect } = require('@playwright/test');
const { site } = require('../../test/__fixtures__/site.json');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

// TODO, review if this is still needed
const checkSectionHeader = async (page, section, headerText) => {
    const header = await page.$(`data-cy=${section}-section >> h2`);
    const headerContent = await header.textContent();
    expect(headerContent).toBe(headerText);
};

test.describe('Homepage', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test.describe('Home Hero section', () => {
        test('renders title and description correctly', async ({ page }) => {
            // Check if the home hero section exists and has a single instance
            const homeHero = await page.$$('data-cy=home-hero');
            expect(homeHero.length).toBe(1);

            // Check if the title in the home hero section matches the expected title
            const titleElement = await page.$('data-cy=home-hero >> h1');
            const titleContent = await titleElement.textContent();
            expect(titleContent).toBe(site.siteMetadata.title);

            // Check if the description in the home hero section matches the expected description
            const descriptionElement = await page.$('data-cy=home-hero >> p');
            const descriptionContent = await descriptionElement.textContent();
            expect(descriptionContent).toBe(site.siteMetadata.description);
        });
    });


    test.describe('Focus Area section', () => {
        test('focus areas can be selected', async ({ page }) => {
            // Check if the focus area section exists and contains the expected header
            const focusAreaHeader = await page.textContent('data-cy=focus-area-section >> h2');
            expect(focusAreaHeader).toBe('Earth Science Focus Areas');

            // Check if focus area elements contain the expected SVG icons and labels
            const focusAreas = await page.$$('data-cy=focus-area-section >> data-cy=focus-area');
            for (const focusArea of focusAreas) {
                const svgElement = await focusArea.$('svg');
                expect(svgElement).toBeTruthy();

                const viewBox = await svgElement.getAttribute('viewBox');
                expect(viewBox).not.toBe('0 0 16 16');

                const labelElement = await focusArea.$('label');
                const labelText = await labelElement.textContent();
                expect(labelText).toBe(await focusArea.textContent());
            }

            // Click on a focus area and verify that the URL changes as expected
            const weatherFocusArea = await page.$('data-cy=focus-area-section >> data-cy=focus-area >> text=Weather');
            await weatherFocusArea.click();

            expect(await page.url()).toContain('/focus/');

            // Verify that the new page has the expected header
            const newHeader = await page.textContent('h1');
            expect(newHeader).toBe('Weather');
        });
    });


    test.describe('Explore section', () => {
        test('there is an explore section', async ({ page }) => {
            // Check if the explore section exists and contains the expected header
            const exploreHeader = await page.textContent('data-cy=explore-section >> h2');
            expect(exploreHeader).toBe('CASEI');

            // Check if the explore link list exists and contains the expected number of items
            const exploreItems = await page.$$('data-cy=explore-link-list >> li');
            expect(exploreItems).toHaveLength(3);

            // Check if the explore items have the expected text content
            expect(await exploreItems[0].textContent()).toContain('Explore campaigns');
            expect(await exploreItems[1].textContent()).toContain('Explore platforms');
            expect(await exploreItems[2].textContent()).toContain('Explore instruments');
        });
    });


    test.describe('Region Type section', () => {
        test('region types can be selected', async ({ page }) => {
            // Check if the region type section exists and contains the expected header
            const regionTypeHeader = await page.textContent('data-cy=region-type-section >> h2');
            expect(regionTypeHeader).toBe('Region Type');

            // Check the number of region type buttons and store their text content
            const regionButtons = await page.$$('data-cy=region-text-control >> button');
            expect(regionButtons).toHaveLength(16);
            const regionButtonTexts = await Promise.all(regionButtons.map(button => button.textContent()));

            // Check the number of region type items and compare their text content with the buttons
            const regionTypes = await page.$$('data-cy=region-type-section >> data-cy=region-type >> data-cy=region-type-name');
            expect(regionTypes).toHaveLength(16);
            const regionTypeTexts = await Promise.all(regionTypes.map(regionType => regionType.textContent()));
            expect(regionButtonTexts).toEqual(regionTypeTexts);

            // Click on the "Island" region type button
            await page.click('data-cy=region-text-control >> text=/Island/i');

            // Check if the "Island" region type is visible
            expect(await page.isVisible('data-cy=region-type-section >> data-cy=region-type-name >> text=/Island/i')).toBeTruthy();

            // Click on the "Mountains" region type button
            await page.click('data-cy=region-text-control >> text=/Mountains/i');

            // Check if the "Mountains" region type is visible
            expect(await page.isVisible('data-cy=region-type-section >> data-cy=region-type-name >> text=/Mountains/i')).toBeTruthy();

            // Click on the visible region type item
            await page.click('.slide-visible >> data-cy=region-type');

            // Check if the URL includes "/explore/campaigns" and the header has the expected text
            expect(page.url()).toContain('/explore/campaigns');
            const headerText = await page.textContent('h1');
            expect(headerText).toBe('Explore campaigns');
        });
    });


    test.describe('Geophysical Concepts section', () => {
        test('geophysical concepts can be selected', async ({ page }) => {
            // Check if the geophysical concepts section exists and contains the expected header
            const geophysicalConceptsHeader = await page.textContent('data-cy=geophysical-concepts-section >> h2');
            expect(geophysicalConceptsHeader).toBe('Geophysical Concepts');

            // Retrieve geophysical concept elements and their text content
            const geophysicalConcepts = await page.$$('data-cy=geophysical-concepts-section >> data-cy=geophysical-concept');
            const geophysicalConceptsTexts = await Promise.all(geophysicalConcepts.map(concept => concept.textContent()));

            // Check if the div elements inside the geophysical concepts have the expected text content
            for (const conceptText of geophysicalConceptsTexts) {
                expect(await page.isVisible(`data-cy=geophysical-concepts-section >> data-cy=geophysical-concept >> text=${conceptText}`)).toBeTruthy();
            }

            // Click on the "Biodiversity" geophysical concept
            await page.click('data-cy=geophysical-concepts-section >> data-cy=geophysical-concept >> text=Biodiversity');

            // Check if the URL includes "/explore/campaigns" and the header has the expected text
            expect(page.url()).toContain('/explore/campaigns');
            const headerText = await page.textContent('h1');
            expect(headerText).toBe('Explore campaigns');
        });
    });


    test.describe('Instruments section', () => {
        test('an instrument can be selected', async ({ page }) => {
            // Check if the instruments section exists and contains the expected header
            const instrumentsHeader = await page.textContent('data-cy=instruments-section >> h2');
            expect(instrumentsHeader).toBe('Measurement Type');

            // Check if the "Spectrometer/Radiometer" instrument type is visible
            expect(await page.isVisible('data-cy=instruments-section >> data-cy=instrument-type >> text=Spectrometer/Radiometer')).toBeTruthy();

            // Click on the "Spectrometer/Radiometer" instrument type
            await page.click('data-cy=instruments-section >> data-cy=instrument-type >> text=Spectrometer/Radiometer');

            // Check if the URL includes "/explore/instruments" and the header has the expected text
            expect(page.url()).toContain('/explore/instruments');
            const headerText = await page.textContent('h1');
            expect(headerText).toBe('Explore instruments');
        });
    });

});
