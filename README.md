<p align="center">
  <a href="https://earthdata.nasa.gov/esds/impact/admg">
    <img alt="NASA" src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" width="300" />
  </a>
</p>
<h1 align="center">
  Airborne Data Inventory
</h1>

The goal of this project is to build a centralized airborne data inventory for easier user access to data and information. Airborne scientists and researchers would like to

- get curated and organized data context for efficient data search,
- gain detailed information with consistent terminology about ongoing and past airborne campaigns in a one-stop-shop for airborne data resources and information
- quickly* find and access relevant data products and view the associated context (* quickly could mean _fewer clicks_)
- provide feedback on inventory contents, noting inaccuracies or requesting ADMG for more details

_To learn more about the goals and ideas of this project, [have a look at the User Story Map](https://miro.com/app/board/o9J_kumT768=/)._

## 🚀 Start developing

1.  **Install the dependencies.**

    This assumes that you already cloned the repository and have yarn installed globally on your machine.

    ```shell
    yarn install
    ```

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
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with the [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to the documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

The project is set up to deploy with CircleCI when changes are merged into the branch `develop`.

[![CircleCI Status](https://circleci.com/gh/developmentseed/airborne-metadata-catalog-internal.svg?style=svg&circle-token=7382cd33d87c082027d281aecdb24433511223c1)](https://app.circleci.com/pipelines/github/developmentseed/airborne-metadata-catalog-internal)
