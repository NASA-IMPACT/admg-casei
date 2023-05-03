const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

async function terminalLog(page, violations) {
    console.log(
        `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`
    );

    const violationData = violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        '#': nodes.length,
        nodes: JSON.stringify(nodes.map((node) => node.html)),
    }));

    console.table(violationData);
}

test.describe('Accessibility tests', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.afterAll(async () => {
        await page.close();
    });

    const testCases = [
        {
            url: '/explore/campaigns',
            title: 'Explore campaigns',
        },
        {
            url: '/explore/platforms',
            title: 'Explore platforms',
        },
        {
            url: '/instrument/2D-S',
            title: '2D-S',
        },
        {
            url: '/glossary',
            title: 'Glossary',
        },
        {
            url: '/about',
            title: 'NASA',
        },
        {
            url: '/faq',
            title: 'FAQs',
        },
        {
            url: '/contact',
            title: 'We appreciate your feedback!',
        },
    ];

    for (const { url, title } of testCases) {
        test(`Navigates to page ${url} and checks for accessibility violations`, async () => {
            await page.goto(baseUrl + url);
            const h1Element = await page.$('h1');
            expect(await h1Element.textContent()).toContain(title);

            await injectAxe(page);
            const violations = await checkA11y(page);

            if (violations && violations.length > 0) {
                await terminalLog(page, violations);
            }
        });
    }
});