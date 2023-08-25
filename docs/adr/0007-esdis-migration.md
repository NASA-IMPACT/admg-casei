
# ADR - Integration of CMR and CASEI

## Context

As part of the ongoing transition of the Catalog of Archived Suborbital Earth Science Investigation (CASEI) from the Airborne Metadata Management Group (ADMG) to Earth Science Data Systems Program (ESDS), a critical aspect is determining the technical implications and development goals for the next fiscal year, commencing with the next Product Increment (PI). This transition's success hinges on aligning with ESDS's vision for CASEI. Early discussions suggest that ESDS envisions using the Common Metadata Repository (CMR) & Global Change Master Directory (GCMD) Keyword Management System (KMS) as the backends for the CASEI frontend, given their existing maintenance of CMR & KMS.  This document describes potential pathways forward to integrate the CASEI frontend with the CMR as a backend.

### What We Know

1. ESDS aims to utilize CMR as the backend for the CASEI system.
2. ADMG's preference is for ESDS to continue providing the unique metadata and frontend features currently available in CASEI.
3. Future metadata curators, whether they be trained Data Archive and Access Centers (DAACs) or the current ADMG curation team, require an interface or non-technical method to contribute data that undergoes an approval workflow.

## Analysis

### Comparison of Data Types

Many of the data types that exist within CASEI are available within the CMR/KMS, although some appear to be identified with different terminology.  Below is an attempt to perform a “crosswalk” between the two systems:

| CASEI | CMR/KMS |
| --- | --- |
| Campaign | Project |
| Instrument | Instrument |
| Platform | Platform |
| Data Products | Collection |
| PlatformType | PlatformType |
| Deployment | ? |

## Challenges

### Data Overlap

When comparing the data within the CMR/KMS and CASEI, many records are unique to only one system. For example, there may be many campaigns listed in the CMR that are not present in CASEI, and vice versa. Similarly, there may be instruments or platforms that are only present in one system and not the other. In such cases, only a small subset of records will be found in both systems. 

An analysis comparing the  `short_name`  values of Campaigns, Instruments, and Platforms records within CASEI and the CMR can be found in the table below:

| Model | # in CASEI | # in KMS | # in CASEI & KMS |
| --- | --- | --- | --- |
| Campaign | 107 | 1876 | 83 |
| Instrument | 547 | 1885 | 203 |
| Platform | 121 | 939 | 15 |

The entirety of the comparison can be found in the following spreadsheet: https://docs.google.com/spreadsheets/d/1oclVKPVzcW2DbIuPoY7GhNApe8mg4ov8xbhgbR6Hrp4.

### Authorship

The experience of authoring Keywords and Concepts within the KMS & CMR are drastically different from that of authoring records within the CASEI backend.

#### Tools

- [CMR Metadata Curation Dashboard](https://cmr-dashboard.earthdata.nasa.gov/)
- [Draft Metadata Management Tool (dMMT)](https://draftmmt.earthdata.nasa.gov/)

#### Schemas

- [CMR Metadata Best Practices](https://wiki.earthdata.nasa.gov/display/CMR/CMR+Metadata+Best+Practices%3A+Landing+Page)
- [GCMD Keyword Requirements](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Requirements)
- [GCMD Keyword Review and Release Process](https://wiki.earthdata.nasa.gov/display/CMR/Keyword+Review+and+Release+Process)

### Metadata Gaps

Records in CMR/KMS do not contain the entirety of metadata contained within the current CASEI backend.

## Strategies

### Curating within CMR/KMS ecosystem, serve a subset of CMR/KMS data

Focusing on transferring curation to existing CMR/KMS tools. Focus attention on re-evaluating which metadata within the current CASEI system is required to be maintained post-ESDS transfer.  The CASEI frontend should be updated as such:

1. Utilize the CMR/KMS as the sole backends.
1. Reduce the data displayed on the CASEI UI to conform to the limited metadata schema offered by the CMR/KMS backends.
1. Generate documentation to guide future data curators to make use of existing CMR & KMS submission processes.
1. As the CASEI system does not intend to serve the entirety of the CMR/KMS dataset, a simple list of KMS Projects (identified by their short_names) could be maintained within the CASEI frontend. At time of build, this list would determine which CASEI Campaigns would be retrieved from the KMS backend. Relationships between records stemming from these Campaigns would then be traversed, populating a dataset which would be used to assemble the CASEI frontend.

### Augment CMR records

#### How to perform 

### Continue usage CASEI Backend

#### Concerns

The uptake of the ADMG backend may be a steep learning curve. The CASEI Backend should be considered an intermediate-to-expert level Django project, which would greatly benefit from a team of developers with prior experience with Django-based applications. It is worth noting that the CMR source code ([`nasa/Common-Metadata-Repository`](https://github.com/nasa/Common-Metadata-Repository)) or the MMT source code ([`nasa/mmt`](https://github.com/nasa/mmt)) are written in Clojure & Ruby, respectively.

If the future maintainers are not familiar with Django framework, it would be prudent to identify which languages and frameworks are familiar to these maintainers and to evaluate the level of effort to port the ADMG backend functionality to another toolset, perhaps in conjunction with the future maintainers.

## Decision Criteria

A chief decision driver regarding the direction to take CASEI is regarding what is to be done with data that the current iteration of CASEI contains but is missing from current CMR/KMS records. This determination will inform us as to whether efforts should be undertaken to maintain 