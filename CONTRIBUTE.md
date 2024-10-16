## 🚀 Start developing

1.  **Make sure to use the correct node version.**

    Assuming you already have `nvm` installed on your machine, this is installing the node version specified in `.nvmrc`.

    ```shell
    nvm install
    ```

    💡You can [configure your shell](https://github.com/nvm-sh/nvm#deeper-shell-integration) to automatically call `nvm use` when entering a directory with a `.nvmrc` file. That way you don't have to remember this step.

1.  **Install the dependencies.**

    This assumes that you already cloned the repository and have yarn installed globally on your machine.

    ```shell
    yarn install
    ```

1.  **Add the environment variables**

    Copy the `.env.example` file and add the secrets.

    ```shell
    # for use within yarn develop
    cp .env.example .env.development

    # for use within yarn build
    cp .env.example .env.production
    ```

    The `ADMG_ACCESS_TOKEN` is needed for the api authentication, it currently needs to be retrieved from the api manually and added to the .env.development - it expires after 10 hours. `ADMG_CLIENT_ID` and `ADMG_CLIENT_SECRET` are used for the login via UI, they do not expire.

1.  **Start developing.**

    ```shell
    yarn develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── .github
    ├── node_modules
    ├── src
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    └── README.md
    ├── yarn.lock

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

5.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

6.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

7.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

8.  **`LICENSE`**: Gatsby is licensed under the MIT license.

9.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how yarn knows which packages to install for your project.

10. **`yarn.lock`**: This is an automatically generated file based on the exact versions of your dependencies that were installed for your project. **(You won’t change this file directly).**

## ✅ Quality assurance

### Formatting

This project uses [Prettier](https://prettier.io/docs/en/why-prettier.html) to standardise code formatting. This allows developers to make use of format on save option in their editor. Also it eliminates the need to discuss style in code review. The rules applied are configured in the [.prettierrc](.prettierrc) file.

You can also run `yarn format` to apply the formatting rules to all files.

```shell
yarn format
```

### Linting

This project uses [ESLint](https://eslint.org/docs/user-guide/getting-started) for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. The rules applied are configured in the [.eslintrc.js](.eslintrc.js) file.

You can also run `yarn lint` to check for linting errors in all javascript files, or run `yarn lint:fix` to apply automatic fixes to the code.

```shell
yarn lint

# alternatively, to apply automatic fixes:
yarn lint:fix
```

### Testing

#### Unit testing

[jest](https://jestjs.io/) and [react-test-renderer](https://reactjs.org/docs/test-renderer.html) are set up and ready to write and run unit tests. The test suit can be run with `yarn test`. In order to run the tests in watch mode for test driven development, run `yarn tdd`.

```shell
yarn test

# alternatively, to run tests in watch mode:
yarn tdd
```

- [ ] TODO: Introduce React Testing Library https://testing-library.com/docs/react-testing-library/intro

#### Integration testing

> The more your tests resemble the way your software is used, the more confidence they can give you. https://twitter.com/kentcdodds/status/977018512689455106

The recent advice is towards a more integrated approach in testing.
You want your tests to avoid including implementation details so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down. For React components, this means to avoid shallow rendering. And in general, to stop mocking so much stuff.

Read more here: https://kentcdodds.com/blog/write-tests or https://testingjavascript.com/

#### End-to-end testing

End-to-end (e2e) tests are functional tests for automated click-testing of critical paths. It is better to automate this rather than relying on the users to do the testing.
This project is using [Playwright](https://playwright.dev/) as end-to-end testing framework. [axe-playwright](https://www.npmjs.com/package/axe-playwright) is used to uncover accessibility issues.

To run the tests locally, first build the frontend with `yarn build`, then run the tests with `yarn test:e2e`. You may need to set the `GATSBY_MAPBOX_TOKEN` environment variable before running the build command.

Playwright is also configured to run the automated tests on GitHub Actions CI.

Some **testing strategies** with Playwright:

- write specs that will solely test a single behavior
- each spec should be written in isolation and avoid coupling
- avoid brittle selectors, use `data-*` attributes instead
- set state directly/programmatically before testing (e.g. use the endpoint to [request](https://playwright.dev/docs/api/class-playwright#playwright-request) a login token instead of making playwright click the login button)

Read more on best practices here: https://playwright.dev/docs/best-practices

### Code review or Pair programming

Following the four eye principle, either of the techniques can be used and _should_ be used when contributing to this project.

_From Wikipedia, the free encyclopedia: https://en.wikipedia.org/wiki/Code_review_

> Code review (sometimes referred to as peer review) is a software quality assurance activity in which one or several people check a program mainly by viewing and reading parts of its source code, and they do so after implementation or as an interruption of implementation. At least one of the persons must not be the code's author. The persons performing the checking, excluding the author, are called "reviewers".
>
> Although direct discovery of quality problems is often the main goal, code reviews are usually performed to reach a combination of goals:
>
> - Better code quality – improve internal code quality and maintainability (readability, uniformity, understandability, ...)
> - Finding defects – improve quality regarding external aspects, especially correctness, but also find performance problems, security vulnerabilities, injected malware, ...
> - Learning/Knowledge transfer – help in transferring knowledge about the codebase, solution approaches, expectations regarding quality, etc; both to the reviewers as well as to the author
> - Increase sense of mutual responsibility – increase a sense of collective code ownership and solidarity
> - Finding better solutions – generate ideas for new and better solutions and ideas that transcend the specific code at hand.
> - Complying to QA guidelines – Code reviews are mandatory in some contexts, e.g., air traffic software

_From Wikipedia, the free encyclopedia: https://en.wikipedia.org/wiki/Pair_programming_

> Pair programming is an agile software development technique in which two programmers work together at one workstation. One, the driver, writes code while the other, the observer or navigator,[1] reviews each line of code as it is typed in. The two programmers switch roles frequently.
>
> While reviewing, the observer also considers the "strategic" direction of the work, coming up with ideas for improvements and likely future problems to address. This is intended to free the driver to focus all of their attention on the "tactical" aspects of completing the current task, using the observer as a safety net and guide.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with the [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to the documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

The project is set up to deploy with [Github Actions](https://github.com/developmentseed/admg-inventory/actions) when changes are merged into the branch `develop`. The configuration lives at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

To manually deploy the project, fill the .env credentials in `.env.production` (more on .env variables above in the above section [Start developing](https://github.com/NASA-IMPACT/admg-inventory/blob/develop/README.md#-start-developing)) and run `yarn build`. This step will create a folder `./public` that can be deployed to a web server. Test if the project has been build correcly with `yarn serve`, which serves the result to a local webserver on `http://localhost:9000/`.

Running `yarn deploy` will deploy to project to surge. If you skip the CI pipeline and want to deploy to surge, you need to be added as a collaborator to the surge domain first.

### Managing Content Security Policy headers

From time to time, it may be necessary to update the Content Security Policy header on the production site, in order to integrate some third party service (e.g. Google Analytics). This header is set in a CloudFront Distribution that we do not have direct access to. The Distribution ID is `E337PI8QFEHP11` and it resides in AWS account `505082353357`. Shawn Foley, at NASA IMPACT, has the ability to modify this Distribution. If you need to update it, contact him on Slack with the details above.
