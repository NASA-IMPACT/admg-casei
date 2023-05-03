import { test, expect } from "@playwright/test"
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe('About', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(baseUrl + '/about');
  });

  test.afterAll(async () => {
    await page.close();
  })

  test('renders correctly', async () => {
    const aboutHero = await page.$('[data-cy=about-hero]');
    expect(aboutHero).toBeTruthy();

    const aboutHeroText = await aboutHero.textContent();
    expect(aboutHeroText).toContain('About');

    const h1Element = await aboutHero.$('h1');
    const h1Text = await h1Element.textContent();
    expect(h1Text).toContain('NASA');

    // inventory section
    const aboutInventorySection = await page.$('[data-cy=about-inventory-section]');
    expect(aboutInventorySection).toBeTruthy();

    const aboutInventorySectionHeader = await aboutInventorySection.$('[data-cy=about-inventory-section-header]');
    expect(aboutInventorySectionHeader).toBeTruthy();

    const aboutInventorySectionHeaderText = await aboutInventorySectionHeader.textContent();
    expect(aboutInventorySectionHeaderText).toContain('Airborne Inventory');

    const aboutInventoryLabel = await page.$('[data-cy=about-inventory-label]');
    expect(aboutInventoryLabel).toBeTruthy();

    const aboutInventoryObjectives = await page.$('[data-cy=about-inventory-objectives]');
    expect(aboutInventoryObjectives).toBeTruthy();

    const objectivesDivs = await aboutInventoryObjectives.$$('div');
    expect(objectivesDivs.length).toBe(3);
    expect(await objectivesDivs[0].textContent()).toContain('Detailed Accounting');
    expect(await objectivesDivs[1].textContent()).toContain('Enhanced Metadata');
    expect(await objectivesDivs[2].textContent()).toContain('Improve Discovery');

    // image break
    const aboutImageSection = await page.$('[data-cy=about-image-section]');
    expect(aboutImageSection).toBeTruthy();

    // motivation section
    const aboutMotivationSection = await page.$('[data-cy=about-motivation-section]');
    const aboutMotivationLabel = await aboutMotivationSection.$('[data-cy=about-motivation-label]');
    expect(await aboutMotivationLabel.textContent()).toContain('Why it Matters');

    const aboutMotivationHeadline = await aboutMotivationSection.$('[data-cy=about-motivation-headline]');
    expect(await aboutMotivationHeadline.textContent()).toContain('A centralized data discovery tool');

    const aboutMotivationText = await page.$('[data-cy=about-motivation-text]');
    expect(aboutMotivationText).toBeTruthy();

    const motivationTextPs = await aboutMotivationText.$$('p');
    expect(motivationTextPs.length).toBe(2);

    // organization section
    const aboutOrganizationSection = await page.$('[data-cy=about-organization-section]');
    const aboutOrganizationLabel = await aboutOrganizationSection.$('[data-cy=about-organization-label]');
    expect(await aboutOrganizationLabel.textContent()).toContain('Responsible Organization');

    const aboutOrganizationHeadline = await aboutOrganizationSection.$('[data-cy=about-organization-headline]');
    expect(await aboutOrganizationHeadline.textContent()).toContain('ADMG’s primary goal');

    const aboutOrganizationText = await page.$('[data-cy=about-organization-text]');
    expect(aboutOrganizationText).toBeTruthy();

    const organizationTextPs = await aboutOrganizationText.$$('p');
    expect(organizationTextPs.length).toBe(1);
  });
});



