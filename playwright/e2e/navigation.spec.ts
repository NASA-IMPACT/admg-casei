const { test, expect } = require('@playwright/test');
import config from "../playwright.config";
import { site } from "../../test/__fixtures__";

const baseUrl = config.use?.baseURL;

test.describe("Navigation", () => {
    let page;

    test.beforeEach(async ({ context }) => {
        page = await context.newPage();
        // TODO review below errors related to site paths for this test
        await page.goto(`${baseUrl}${site.path}`);
    });

    test("going back or forward in the browser's history is possible", async () => {
        // https://playwright.dev/docs/api/class-page?_highlight=go#pagegohistorydelta

        await page.click("nav:has-text(Contact)");
        await expect(page).toHaveURL("**/contact**");

        await page.goBack();
        await expect(page).not.toHaveURL("**/contact**");

        await page.goForward();
        await expect(page).toHaveURL("**/contact**");

        // clicking back
        await page.goBack();
        await expect(page).not.toHaveURL("**/contact**");

        // clicking forward
        await page.goForward();
        await expect(page).toHaveURL("**/contact**");
    });

    test("reloading the page maintains the url", async () => {
        // https://playwright.dev/docs/api/class-page?_highlight=reload#pagereloadoptions

        await page.click("nav:has-text(Contact)");
        await expect(page).toHaveURL("**/contact**");

        await page.reload();
        await expect(page).toHaveURL("**/contact**");

        // reload the page without using the cache
        await page.reload({ 'true': true });
        await expect(page).toHaveURL("**/contact**");
    });

    test("visiting a remote url directly loads the respective page", async () => {
        // https://playwright.dev/docs/api/class-browser-context#browsercontextnewpageurl-options

        // Visit any sub-domain of your current domain

        // Pass options to the visit
        await context.newPage({ timeout: 50000 }).then(async (page) => {
            await page.goto(`${baseUrl}/contact`, {
                timeout: 50000, // increase total time for the visit to resolve
                waitUntil: 'networkidle',
            });
            const title = await page.title();
            expect(title).toContain('Contact');
            expect(page.url()).toContain('contact');
        });
    });
});
