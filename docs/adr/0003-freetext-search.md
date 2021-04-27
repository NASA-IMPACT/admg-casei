# 3. Free text search improvements

- Status: proposed
- Deciders: @rwegener2 W @necoline @tania-pires @AliceR @aluckach
- Date: 2021-04-27


## Context and Problem Statement

The current free text search

- only searches on whole words
- is strict with typos
- searches on defined database columns (not sure which ones)

The frontend currently sends an api request to the backend, where the search is executed and sends back the matching items. This is executed as one request per type (i.e. `/campaign?search=string`, `/platform?search=string`, `/instrument?search=string`, ...). After some seconds, the results can be displayed in the UI. It does not feel very performant, and seems to be an unnecessary dependency.

Do we need to or want to improve the search experience for our users?

Note: A real search experience differs from [filtering cards by text input](https://github.com/NASA-IMPACT/admg-inventory/issues/257).

## Considered Options

- Manual Search on Client
- Client-side search tools (Lunr, Fuse, JS Search, etc)
- Google search
- Algolia

## Desired Outcome

At **minimum**, we want users to be able to successfully search with

- partial queries
- queries with light typos
- url search params

An **ideal** outcome might include

- access recent search queries
- auto-complete
- search analytics - see what most people are searching. Identify areas for improvement for other userflows.

What we **don't** want

- clunky search results
- search queries that pull results using references from page content - search should be limited to short and long names

## Decision Outcome

Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)].

### Positive Consequences <!-- optional -->

- [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
- …

### Negative Consequences <!-- optional -->

- [e.g., compromising quality attribute, follow-up decisions required, …]
- …

## Pros and Cons of the Options <!-- optional -->

### Manual JS Search on Client

We have all the data available from the build process. Just like we currently sort and filter, we can search for a string or substring on the frontend. We might need to be careful with performance, but so far, sort and filter are super fast and I don't see why search would not be almost as fast. One key reason being that our database isn't expected to grow to a point where performance is going to be an issue.

- Good, because we might be able to get live-updating search results while a user is typing.
- Bad, because it will be on us to implement, test and maintain
  
### Client-side search tools

There are a number of mature client-side search tools available.  These tools would be used to generate an index of the data on which we will enable search.  The index can be packaged with our application and utilized when performing client-side searches.

#### Overview

Library | ⭐️ 
--- | ---
[Lunr.js](https://lunrjs.com) | [7.5k](https://github.com/olivernn/lunr.js)
[Fuse.js](https://fusejs.io/) | [12.4k](https://github.com/krisk/fuse)
[Elasticlunr.js](http://elasticlunr.com/) | (1.7k)[https://github.com/weixsong/elasticlunr.js]
[FlexSearch.js](https://github.com/nextapps-de/flexsearch) | [7k](https://github.com/nextapps-de/flexsearch)
[JS Search](https://bvaughn.github.io/js-search/) | [1.8k](https://github.com/bvaughn/js-search)


- Good, because they all offer features that we likely wouldn't have the time to implement, such as:
  * stemming, i.e. searching for "aerosols" will return positive results for alternatives like "aerosol" (singular).
  * scoring/boosts, placing different value on where the matched records are stored, e.g. we could prioritize matches in the `short_name` higher than matches found in the `long_name`
  * fields, i.e. search specific fields for a string, such as `type:instrument` to find only instruments matching a term.
  * fuzzy matching, will help gloss over typos
- Good, because Gatsby has plugins to assist in integration (e.g. [gatsby-plugin-local-search](https://www.gatsbyjs.com/plugins/gatsby-plugin-local-search/?=flexsearch), [gatsby-plugin-lunr
](https://www.gatsbyjs.com/plugins/gatsby-plugin-lunr/), [@gatsby-contrib/gatsby-plugin-elasticlunr-search](https://www.gatsbyjs.com/plugins/@gatsby-contrib/gatsby-plugin-elasticlunr-search/), [@draftbox-co/gatsby-plugin-fusejs](https://www.gatsbyjs.com/plugins/@draftbox-co/gatsby-plugin-fusejs/)).
- Good, because no external infrastructure requirements
- Bad, because more complex build process.


### Google Search

Since all the pages for all the campaigns/platforms/instruments are rendered server side, all the content that is displayed to a user will be searchable by google. We can embed a simple google search bar and display the search results (see https://support.google.com/programmable-search/answer/4513903?hl=en).

- Good, because it offers the potential of nuanced search that google search offers
- Bad, because we have less control over the display of search results -- this needs to be confirmed


### Algolia

[Algolia](https://www.algolia.com/) is a tool that handles search for frontend interfaces. They use webhooks to watch for changes to your db and [caches data in an algolia account? I'm actually not sure how they are accessin the data they are searching].
On the frontend, we can then access the algolia search api to access suggested queries from recent searches, autocompletion, popular searcher (it's all customizable) and access results from a submited user query. In addition to the search suggestion options, we also will get url query params out of the box.

The first 10,000 searches are free. After that, it is $1 per 1,000 search requests per month.

- Good, because it offers reliable, extensive search features
- Good, because it integrates well with Gatsby
- Good, because we don't have to really write or maintain any code
- Good, because it is very easy to scale up search funcationality. I doubt we want natural language processing, but maybe we do down the road
- Bad, because there is a cost associated, but given the amount of traffic we expect, I think it is quite worth the money
- Bad, because it might be a bit too powerful for what we are after. I think we can keep costs low by opting in to only the basics
