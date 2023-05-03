const { test, expect } = require('@playwright/test');
import config from "../playwright.config";
const baseUrl = config.use?.baseURL

test.skip("Login", () => { // TODO get configurations for this test to run in new environment(s)
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(baseUrl);
    });

    test.beforeAll(async () => {

        // Use a custom function to intercept and overwrite the fetch request
        await page.route("**/index.json", (route, request) => {
            route.fulfill({
                contentType: "application/json",
                headers: { "access-control-allow-origin": "*" },
                status: 200,
                body: JSON.stringify({
                    access_token: "ks2zW9_random-token",
                    expires_in: 36000,
                    token_type: "Bearer",
                    scope: "read write",
                    refresh_token: "NSNOHi_random-token",
                }),
            });
        });
        await page.goto(`${baseUrl}/campaign/SnowEx`);
    });

    test("opens a login modal and fills in credentials", async () => {
        await page.click("footer button:has-text('Maintenance login')");
        await page.waitForSelector("[data-cy=login-form]");

        const username = process.env.CYPRESS_username;
        const password = process.env.CYPRESS_password;

        expect(username, "username was set").toBeDefined().not.toBeNull();
        if (!password) {
            throw new Error("Missing password value, run tests with CYPRESS_password=...");
        }

        await page.fill("[name=username]", username);
        await page.fill("[name=password]", password);

        const submitButton = await page.waitForSelector("[type=submit]");
        await submitButton.click();

        // Wait for the login form to disappear
        await page.waitForSelector("[data-cy=login-form]", { state: "hidden" });

        // Ensure that the token was saved to sessionStorage
        const token = await page.evaluate(() => sessionStorage.getItem("token"));
        expect(token).toBeTruthy();

        await page.click("footer button:has-text('Log out')");
        await page.waitForSelector("text=Are you sure you want to log out?");
        const logoutButton = await page.waitForSelector("[data-cy=confirm-button]");
        await logoutButton.click();

        // Wait for the confirmation dialog to disappear
        await page.waitForSelector("[data-cy=confirmation-dialog]", { state: "hidden" });

        // Ensure that the token was removed from sessionStorage
        const token2 = await page.evaluate(() => sessionStorage.getItem("token"));
        expect(token2).toBeFalsy();
    });

    test.afterAll(async () => {
        // Ensure the token is removed in case of errors
        await page.evaluate(() => sessionStorage.removeItem("token"));
        await page.close();
    });
});
