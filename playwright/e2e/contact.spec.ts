const { chromium } = require("@playwright/test");
const { test, expect } = require('@playwright/test');
import config from "../playwright.config"
const baseUrl = config.use?.baseURL

test.describe("Contact", () => {

    let browser, page;

    test.beforeAll(async ({ browser }) => {

        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.afterAll(async (browser) => {
        browser = await chromium.launch();
        await browser.close();
    });

    test.beforeEach(async (browser) => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto(baseUrl + "/contact");
    });

    test.afterEach(async () => {
        await page.close();
    });

    test("renders correctly", async () => {
        await page.waitForSelector("main h1:text('feedback')");
        await page.waitForSelector("main p:text('NASA inventory')");
    });
});
