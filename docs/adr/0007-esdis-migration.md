
# ADR - Integration of CMR and CASEI

## Context

As part of the ongoing transition of the Catalog of Archived Suborbital Earth Science Investigation (CASEI) from the Airborne Metadata Management Group (ADMG) to ESDS (Earth Science Data Systems) Program, a critical aspect is determining the technical implications and development goals for the next fiscal year, commencing with the next Product Increment (PI). This transition's success hinges on aligning with ESDS's vision for CASEI. Early discussions suggest that ESDS envisions using the Common Metadata Repository (CMR) as the backend for the CASEI front end, given their existing maintenance of CMR.  This document describes potential pathways forward to integrate the CASEI frontend with the CMR as a backend.

### What We Know

1. ESDS aims to utilize CMR as the backend for the CASEI system.
2. ADMG's preference is for ESDS to continue providing the unique metadata and frontend features currently available in CASEI.
3. Future metadata curators, whether they be trained Data Archive and Access Centers (DAACs) or the current ADMG curation team, require an interface or non-technical method to contribute data that undergoes an approval workflow.

## Analysis

### Comparison of Data Types

Many of the data types that exist within CASEI are available within the CMR/KMS, although some appear to be identified by a different name.  Below is an attempt to perform a “crosswalk” between the two systems:

| CASEI | CMR/KMS |
| --- | --- |
| Campaign | Project |
| Instrument | Instrument |
| Platform | Platform |
| Data Products | Collection |
| PlatformType | PlatformType |

## Challenges

### Data Overlap

When comparing the data within the CMR/KMS and CASEI, many records are unique to only one system. For example, there may be many campaigns listed in the CMR that are not present in CASEI, and vice versa. Similarly, there may be instruments or platforms that are only present in one system and not the other. In such cases, only a small subset of records will be found in both systems. 

An analysis comparing the  `short_name`  values of Campaigns, Instruments, and Platforms records within CASEI and the CMR can be found in the table below:

| Model | # in CASEI | # in KMS | # in CASEI & KMS |
| --- | --- | --- | --- |
| Campaign | 107 | 1876 | 83 |
| Instrument | 547 | 1885 | 203 |
| Platform | 121 | 939 | 15 |

The entirety of the comparison can be found with [this spreadsheet](https://docs.google.com/spreadsheets/d/1oclVKPVzcW2DbIuPoY7GhNApe8mg4ov8xbhgbR6Hrp4/edit?usp=sharing).

### Authorship

The experience of authoring Keywords and Concepts within the KMS & CMR are drastically different from that of authoring records within the CASEI backend.

### Metadata Gaps

## Strategies

### Subsetting CMR

### Augment CMR

### Continue ADMG Backend
