# Testing this application

## End to End tests (with Playwright)

To test the application end to end, we recomend creating a production build locally with `yarn build` and serving the production bundle with `yarn serve -p 8888`. After your application is running you can start up the end to end tests with ` npx playwright test` (to run all end to end test) or `npx playwright test my-test.spec.ts` for a specific test.
