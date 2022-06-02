# 4. Visual Testing

- Status: proposed
- Deciders: [list everyone involved in the decision]
- Date: 2022-05-24

Technical Story: https://github.com/NASA-IMPACT/admg-casei/issues/434

## Context and Problem Statement

The CASEI site, at the moment of writing, is designed primarily for a desktop experience and does not display correctly at mobile resolutions. We would like to correct this and ensure that the site works well at all common screen sizes. Given the complexity of manually testing different screen sizes on each change, we would like to introduce some safeguards in the form of automated tests, to ensure we don't introduce design regressions.

The curators/administrators of CASEI may also be interested in the opportunity to review/approve a visual summary of changes to the site ahead of each production push, so we should consider that workflow, as well.

## Decision Drivers

- Ease of integration with the existing site/CI tooling
- Cost
- Ability to test on real mobile devices (optional, depending on cost)
- Ability for non-developers to review/approve production builds based on visual snapshots

## Workflow Options

### Option 1: Headless regression testing

- Integrate visual regression testing with our current test suite and run it on each PR in Github Actions. Add a suite to the current unit tests and behavioral tests that would run the visual regression, saving image outputs as baseline (and then with every run we would compare the diff between each image). There are some customizations we can do like how severe the warning is if we find something.
- Since it’s normal that curator content always changes, we would need to ignore the “normal and expected” differences
- This option isn’t something visible to curators. Curators won’t interact directly. You just see the test fail, but if you want to make a change you need to go into the code. Can still store all the screenshots.
- We should do this regardless of whether we also pursure option 2 or 3. It's relatively straightforward to set up and provides the development team with a set of safeguards against breaking the new mobile layout. It's also a necessary preliminary step if we pursue option 2.

### Option 2: Curator/Admin interface for reviewing production builds ahead of deployment

- Employ a third party service that displays snapshots (output of test) and provides an interface allowing curators to approve/reject a build. Approvals link back to GitHub pull request and integrates better in the current workflow where things are blocked until approval is granted.
- Will be extra work for curators on each production push
- This would only be employed on PRs to the `production` branch, to avoid unnecessary review by curators. Option 1 would run on every PR, to allow developers to catch design issues early.
- If curators update content and not code, they deploy without kicking off this kind of process (short circuit process). We might need to modify that workflow to trigger Option 2 and make a build that they need to approve.
- Performing this step on each production push means we’re dealing with smaller changes each time instead of one massive set of changes (see Option 3)
- Curators already approve content changes through the MI and this process would not snapshot every page of content, anyway, so this would only be necessary if curators want final approval on design changes and the opportunity to act as one final layer of QA before deploying.

### Option 3: Visual review on demand (or on a schedule)

- We could still use one of the services from Option 2, but would not integrate with GitHub.
- Create a full set of snapshots for review on demand or on a schedule.
- Wouldn’t have to do it as often if curators are busy and don’t want to bottleneck the deployment process.
- Could be useful when developing big features.
- Could result in a lot of changes each time, requiring an extensive review process.
- Not being automated means we need to make a point of doing this occasionally. Good chance we will forget. Requires us to document the process, in the event of project handover.

## Considered Tools/Services

- BrowserStack/Percy
- LambdaTest
- Applitools
- Cypress with multiple viewport resolutions
- Playwright

## Decision Outcome

Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)].

### Positive Consequences <!-- optional -->

- [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
- …

### Negative Consequences <!-- optional -->

- [e.g., compromising quality attribute, follow-up decisions required, …]
- …

## Pros and Cons of the Options

### BrowserStack/Percy

https://www.browserstack.com/percy

Percy is BrowserStack's visual comparison tool. It appears to come with out-of-the-box Gatsby integration, allowing us to run snapshots on all (or some) pages as part of the Gatsby build process. However, the npm package which enables this appears to be quite outdated compared to the core Percy packages (despite being an official library). Unfortunate, but Percy comes with a CLI tool which can be integrated pretty easily nonetheless.

- Good, because the CLI tool is easy to configure and integrate with Github Actions.
- Good, because the free tier offers 5000 snapshots/month (enough to run ~10 comparisons per day, assuming 15 pages per test run).
- Good, because it includes a web interface for reviewing each build and approving changes.
- Good, because it integrates with Github PRs, allowing us to make visual review a required step in PRs to production.
- Bad, because no integration with Github Issues
- Bad, because it does not produce screenshots from mobile devices, so factors such as OS/mobile browser discrepancies and pixel density are not reflected in the results.

### LambdaTest

https://www.lambdatest.com

LambdaTest is comparable to BrowserStack/Percy in terms of features, and includes visual regression testing. It integrates with Cypress (our current E2E testing library), which should make setting it up fairly straightforward, but the Cypress integration does not support the use of real or virtualized mobile devices. In order to enable this, we must use Selenium, which means setting up ane entirely new test framework in order to acquire screenshots.

- Good, because it supports mobile devices.
- Bad, because we would need to implement a new test suite in Selenium to make use of mobile devices.
- Good, because it has a web interface for reviewing visual differences between screenshots.
- Bad, because the web interface does not have the concept of a "Build" which can be approved. Each screenshot is treated separately.
- Good, because it integrates with Github Issues for bug reports.
- Bad, because it does not integrate with Github PRs.
- Good, because the paid tiers are comparable in price to BrowserStack.
- Bad, because it does not have a perpetual free tier.
- Bad, because the default full-page screenshot behavior does not play well with our sticky banners and re-renders them throughout the page (we can implement a workaround for this, but it's a bit of a pain).

### Applitools

https://applitools.com/

Applitools is another hosted testing platform. It includes an "AI-powered" visual comparison tool, which claims to be able to ignore inconsequential differences. It integrates easily with Cypress and other E2E testing tools.

- Good, because it supports mobile emulation with our current test suite and integration is pretty straightforward.
- Good, because it includes a web interface for reviewing changes and groups screenshots by test suite run, making it comparable to the Builds used in Percy.
- Good, because it integrates with Github PRs to mark visual tests as either passed or failed.
- Bad, because it does not integrate with Github Issues.
- Bad, because the Pricing page contains no actual _prices_. I've reached out to support of figure out how much each tier of service actually costs.

### Cypress with multiple viewport resolutions

https://docs.cypress.io/api/commands/viewport

This option involves extending our existing Cypress End-to-End test suite to run at multiple viewport resolutions, in order to simulate running on mobile devices. This would be straightforward to implement and screenshots would be automatically captured in Github Actions artifacts, just as they currently are.

- Good, because it would be straightforward update our existing cypress test suite to run at multiple resolutions
- Good, because we should expand our e2e tests to run on multiple resolutions, anyway, once we've updated the design to display differently on smaller screens.
- Good, because there are existing plugins for hosting an interface to perform image comparison.
- Bad, because we have to deploy and maintain that service.
- Questionable, because expanding the number of e2e tests we run in Github Actions by 2-3x could have significant time/cost implications. Our suite currently runs in ~10 minutes, so adding 20 minutes to that would cost an additional $0.16 per test run ($0.24 total) on Linux machines. That isn't a terrible cost overhead, but the additional 20 minutes per test run could be inconvenient.
- Bad, because Cypress cannot run tests on Safari or mobile emulators, so we lose some cross-browser accuracy.

### Playwright

https://playwright.dev/

Playwright is an alternative E2E test runner, which would replace Cypress in our project. It supports more browsers and mobile emulation out of the box and includes visual comparison tests. It does not appear to have an existing service for displaying/approving image diffs, but it can integrate with Percy or LambdaTest.

- Good, because it comes with out of the box support for multiple browsers, including Safari and mobile emulation.
- Bad, because we would need to rewrite our existing E2E test suite.
- Good, maybe, because the existing E2E suite is kind of flaky, anyway.
- Bad, because we may run into this issue, where snapshots are rebuilt in the CI Linux environment and don't match those created in a dev environment: https://github.com/microsoft/playwright/discussions/12729. There appears to be a workaround using Docker, however.
