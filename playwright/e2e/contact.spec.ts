const { chromium } = require("@playwright/test");
const { test, expect } = require('@playwright/test');

test.describe("Contact", () => {
    let browser, page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("/contact");
    });

    test.afterEach(async () => {
        await page.close();
    });

    test("renders correctly", async () => {
        await page.waitForSelector("main h1:text('feedback')");
        await page.waitForSelector("main p:text('NASA inventory')");
    });
});
