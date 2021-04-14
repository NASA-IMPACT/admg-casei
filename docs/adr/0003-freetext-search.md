# 3. Free text search improvements

- Status: proposed
- Deciders: @rwegener2 W @necoline @tania-pires @AliceR
- Date: 2021-04-14

Technical Story: https://github.com/NASA-IMPACT/admg-inventory/issues/257

## Context and Problem Statement

The current free text search

- only searches on whole words
- is strict with typos
- searches on defined database columns (not sure which ones)

The frontend currently sends an api request to the backend, where the search is executed and sends back the matching items. This is executed as one request per type (i.e. `/campaign?search=string`, `/platform?search=string`, `/instrument?search=string`, ...). After some seconds, the results can be displayed in the UI. It does not feel very performant, and seems to be an unnecessary dependency.

Do we need to or want to improve the search experience for our users?

## Considered Options

- Option A) implementing a search via javascript on the client.

- Option B) leverage google search to build into our site.

- Option C) combine those two approaches A+B

## Decision Outcome

Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)].

### Positive Consequences <!-- optional -->

- [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
- …

### Negative Consequences <!-- optional -->

- [e.g., compromising quality attribute, follow-up decisions required, …]
- …

## Pros and Cons of the Options <!-- optional -->

### A: JS Search on Client

We have all the data available from the build process. Just like we currently sort and filter, we can search for a string or substring on the frontend. We might need to be careful with performance, but so far, sort and filter are super fast and I don't see why search would not be almost as fast. One key reason being that our database isn't expected to grow to a point where performance is going to be an issue.

- Good, because we might be able to get live-updating search results while a user is typing.
- Good, because we can be very explicit about the fields we are searching on. We could have a field to search be short name, and another field where a user can type the region they are interested in.
- Bad, because it will be on us to implement, test and maintain

### Google Search

Since all the pages for all the campaigns/platforms/instruments are rendered server side, all the content that is displayed to a user will be searchable by google. We can embed a simple google search bar and display the search results (see https://support.google.com/programmable-search/answer/4513903?hl=en).

- Good, because it offers the potential of nuanced search that google search offers
- Bad, because we have less control over the display of search results -- this needs to be confirmed

### Combination

We can offer the complete google search to get back any results for any pages on a dedicated search page, and use the javascript filter method to search on a specific field such as the short name to limit the list of cards.

- Good, because ?
- Bad, because ?

## Links <!-- optional -->

- [Link type][link to adr] <!-- example: Refined by [ADR-0005](0005-example.md) -->
- … <!-- numbers of links can vary -->
