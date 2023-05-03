const { test, expect } = require('@playwright/test');
import config from "../playwright.config";

const baseUrl = config.use?.baseURL;

test.describe("Navigation", () => {
    let page;

    test.beforeEach(async ({ context }) => {
        page = await context.newPage();
        // TODO review below errors related to site paths for this test
        await page.goto(baseUrl);
    });

    test("going back or forward in the browser's history is possible", async () => {
        // https://playwright.dev/docs/api/class-page?_highlight=go#pagegohistorydelta

        await page.goto(baseUrl + '/contact')

        const contactRegex = /contact/;
        await expect(page).toHaveURL(contactRegex);

        await page.goBack();
        await expect(page).not.toHaveURL(contactRegex);

        await page.goForward();
        await expect(page).toHaveURL(contactRegex);

        // clicking back
        await page.goBack();
        await expect(page).not.toHaveURL(contactRegex);

        // clicking forward
        await page.goForward();
        await expect(page).toHaveURL(contactRegex);
    })

    test("reloading the page maintains the url", async () => {
        // https://playwright.dev/docs/api/class-page?_highlight=reload#pagereloadoptions

        const contactRegex = /contact/;
        await page.goto(baseUrl + '/contact')
        await expect(page).toHaveURL(contactRegex);

        await page.reload();
        await expect(page).toHaveURL(contactRegex);

        // reload the page without using the cache
        await page.reload({ 'true': true });
        await expect(page).toHaveURL(contactRegex);
    });

    test("visiting a remote url directly loads the respective page", async ({ context }) => {
        // https://playwright.dev/docs/api/class-browser-context#browsercontextnewpageurl-options

        // Visit any sub-domain of your current domain

        // Pass options to the visit
        await context.newPage({ timeout: 50000 }).then(async (page) => {
            await page.goto(baseUrl + '/contact');
            const title = await page.title();
            expect(title).toContain('Contact');
            expect(page.url()).toContain('contact');
        });
    });
});
