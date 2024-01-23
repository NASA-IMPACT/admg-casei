# ADR - Integration of CMR and CASEI

## Context

As part of the ongoing transition of the Catalog of Archived Suborbital Earth Science Investigation (CASEI) from the Airborne Metadata Management Group (ADMG) to the Earth Science Data Systems Program (ESDS), a critical aspect is determining the technical implications and development goals for the next fiscal year, commencing with the next Product Increment (PI). This transition's success hinges on aligning with ESDS's vision for CASEI. Early discussions suggest that ESDS envisions using the Common Metadata Repository (CMR) and Global Change Master Directory (GCMD) Keyword Management System (KMS) as the backends for the CASEI frontend, given their existing maintenance of CMR & KMS. This document describes potential pathways to integrate the CASEI front end with the CMR as a backend.

### What We Know

1. ESDS aims to utilize CMR as the backend for the CASEI system.
1. ADMG prefers ESDS to continue providing the unique metadata and frontend features currently available in CASEI.
1. Future metadata curators, whether they be trained Data Archive and Access Centers (DAACs) or the current ADMG curation team, require an interface or non-technical method to contribute data that undergoes an approval workflow.

## Analysis

### Comparison of Data Types

Many data types within CASEI are available within the CMR/KMS, although some appear to be identified with different terminology. Below is an attempt to perform a "crosswalk" between the two systems:

| CASEI         | CMR/KMS      |
| ------------- | ------------ |
| Campaign      | Project      |
| Instrument    | Instrument   |
| Platform      | Platform     |
| Data Products | Collection   |
| PlatformType  | PlatformType |
| Deployment    | ?            |

## Challenges

### Data Overlap

When comparing the CMR/KMS and CASEI data, many records are unique to only one system. For example, there may be many campaigns listed in the CMR that are absent in CASEI, and vice versa. Similarly, instruments or platforms may only be present in one system and not the other. In such cases, only a small subset of records will be found in both systems.

An analysis comparing the `short_name` values of Campaigns, Instruments, and Platforms records within CASEI and the CMR can be found in the table below:

| Model      | # in CASEI | # in KMS | # in CASEI & KMS |
| ---------- | ---------- | -------- | ---------------- |
| Campaign   | 107        | 1876     | 83               |
| Instrument | 547        | 1885     | 203              |
| Platform   | 121        | 939      | 15               |

The entirety of the comparison can be found in the following spreadsheet: https://docs.google.com/spreadsheets/d/1oclVKPVzcW2DbIuPoY7GhNApe8mg4ov8xbhgbR6Hrp4.

### Authorship

The experience of authoring Keywords and Concepts within the KMS & and CMR drastically differs from authoring records within the CASEI backend.

#### Tools

- [CMR Metadata Curation Dashboard](https://cmr-dashboard.earthdata.nasa.gov/)
- [Draft Metadata Management Tool (dMMT)](https://draftmmt.earthdata.nasa.gov/)

#### Schemas

- [CMR Metadata Best Practices](https://wiki.earthdata.nasa.gov/display/CMR/CMR+Metadata+Best+Practices%3A+Landing+Page)
- [GCMD Keyword Requirements](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Requirements)
- [GCMD Keyword Review and Release Process](https://wiki.earthdata.nasa.gov/display/CMR/Keyword+Review+and+Release+Process)

### Metadata Gaps

Records in CMR/KMS do not contain the entire metadata within the current CASEI backend.

## Strategies

### Curating within CMR/KMS ecosystem, serve a subset of CMR/KMS data

Focusing on transferring curation to existing CMR/KMS tools. Focus attention on re-evaluating which metadata within the current CASEI system is required to be maintained post-ESDS transfer. The CASEI frontend should be updated as such:

1. Utilize the CMR/KMS as the sole backends. Since the CASEI system does not intend to serve the entirety of the CMR/KMS dataset, a simple list of KMS Projects (identified by their short_names) could be maintained within the CASEI frontend. At the time of build, this list would determine which CASEI Campaigns would be retrieved from the KMS backend. Relationships between records stemming from these Campaigns would then be traversed, populating a dataset that would be used to assemble the CASEI front end.
1. Reduce the data displayed on the CASEI UI to conform to the limited metadata schema offered by the CMR/KMS backends.
1. Generate documentation to guide future data curators to use existing CMR and KMS submission processes.

#### Pros

- Little/no change is required for the existing CMR/KMS ecosystem.
- Retire the current CASEI backend, reducing operational overhead for ESDS.

#### Cons

- Some added complexity maintaining a list of KMS projects to include within CASEI, requiring curators to submit records to CMR/KMS and register them within CASEI.
- Reduced data displayed on the CASEI UI to conform to the limited metadata schema offered by the CMR/KMS backends.
- Future data curators must be trained to use CMR and KMS to submit new metadata.
- The loss of the current CASEI backend public API. However, efforts could be made to add a read-only API to the CASEI frontend where JSON serialized version of the CASEI data. The utility of this is questionable if this data is already accessible from the CMR/KMS.

#### Estimated level of effort

Medium; roughly one product increment for a team of two developers.

### Augment CMR records

To accommodate the desire to utilize the CMR/KMS as a backend but also to compensate for the lack of completeness in data that the CMR/KMS currently provides, it is possible to retrieve what is available from the CMR but additionally augment that data with data stored in an auxiliary system. During the build process of the CASEI front end, these various data sources would be queried, and records for coincidental concepts would be merged into a single record, likely giving precedent to information retrieved from the CMR/KMS. Such a system requires extensive planning and consultation with future CASEI maintainers. On an elementary level, these records could be stored as flat files within the CASEI frontend repository, wherein the approval process would be reduced to Pull Requests on GitHub, and validation would occur via linting operations via GitHub Actions. At a more complex level, a system similar to the current CASEI backend could be developed to assist in this curation process. Modifying the current CASEI backend to accomplish this task is possible but would likely involve a significant refactor and substantial development hours.

#### Estimated level of effort

High; roughly one to two product increments for a team of three or more developers.

#### Pros

- Maintain the rich metadata currently within CASEI while fulfilling the desire to serve data from CMR.

#### Cons

- Significant added complexity requiring curators to manage records in both CMR/KMS and the CASEI metadata augmentation service/codebase.
- Future data curators must be trained to use CMR and KMS to submit new metadata.
- Loss of the current CASEI backend public API. However, efforts could be made to add a read-only API to the CASEI frontend where JSON serialized version of the CASEI data.

### Continue usage of CASEI Backend

The current CASEI backend was custom-built to accommodate the specific needs of the CASEI project, particularly its data model and approval workflow. Given that it is currently addressing the needs of the CASEI project, development requirements could be alleviated by continuing to use the CASEI backend as we do today. As such, efforts should shift towards developing detailed documentation about the software architecture to set up future codebase maintainers for success.

#### Estimated level of effort

Low; less than one product increment for a team of two developers.

#### Pros

- Minimal attending development needs. The current CASEI backend runs in an isolated Amazon Web Services (AWS) account. It is possible to transfer ownership of this account to ESDS to avoid the need for redeployment of any services.
- Makes use of the entirety of current ADMG metadata.

#### Cons

- Onboarding to the current CASEI backend codebase can be a steep learning curve. The CASEI backend should be considered an intermediate-to-expert level Django project, which would greatly benefit from a team of developers with prior experience with Django-based applications. It is worth noting that the CMR source code ([`nasa/Common-Metadata-Repository`](https://github.com/nasa/Common-Metadata-Repository)) or the MMT source code ([`nasa/mmt`](https://github.com/nasa/mmt)) are written in Clojure & Ruby, respectively.

  Suppose the future maintainers need to become more familiar with the Django framework. In that case, it is prudent to identify which languages and frameworks are familiar to these maintainers and evaluate the effort to port the CASEI backend functionality to another toolset in conjunction with future maintainers.

- Does not make use of the CMR/KMS backends. To be included in CASEI, data must be manually submitted via curators.

## Decision Criteria

Determining the direction to take CASEI is largely dependent on two questions:

1. What is to be done with data that the current iteration of CASEI contains but needs to be added to current CMR/KMS records? This determination will inform us whether efforts should be undertaken to trim down and simplify CASEI to fit in with CMR/KMS' current data model or if we should dedicate time to compensate for CMR/KMS's more sparse data model.
1. Is ESDS capable and willing to take ownership over the maintenance of the current CASEI backend and to adapt to using its existing curator workflow for future CASEI data input?
