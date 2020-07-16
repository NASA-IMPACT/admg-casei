import React from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"
import { SectionBlock } from "../components/section"

const About = () => (
  <Layout>
    <Hero
      tagTitle="About"
      title="NASA airborne campaigns use the vantage point of space to explore critical questions to increase our understanding of planet earth."
      textToImageRatio={[8, 3]}
      id="about"
    ></Hero>

    <SectionBlock
      tagline="Airborne Inventory"
      headline="CARA is a comprehensive inventory containing  information about all past and present airborne campaigns, platforms, instruments, geophysical concepts and data products."
      withText
      id="about-inventory"
    >
      <div className="placeholder">
        <h3>Comprehensive Archive</h3>
        <p>
          To locate and catalog historical NASA airborne Earth science campaigns
          and data products.
        </p>

        <h3>Enhanced Metadata</h3>
        <p>
          To identify and enhance metadata for improved information and
          discovery.
        </p>

        <h3>Improve Discovery</h3>
        <p>
          To make searching for airborne data more intuitive and complete no
          matter where data are archived
        </p>
      </div>
    </SectionBlock>

    <SectionBlock
      tagline="Why it Matters"
      headline="A centralized data discovery tool that aims to provide a simple and consistent interface for important research, applications, and decision making."
      withText
      id="about-motivation"
    >
      <p>
        The traditional paradigm of NASA’s field investigations consists of a
        targeted collection of specific geophysical observations aimed at
        answering key science questions stemming from the investigation’s
        primary research objectives. Historically, investigation data have been
        stored at various NASA Distributed Active Archive Centers (DAACs), NASA
        Airborne Science facilities, field archives, or even individual
        researchers’ hard drives. Users of investigation data have typically
        been those involved in the investigation or in similar investigations.
        Over time, these knowledgeable researchers retire or move on to other
        studies, leaving the data isolated and inadequately described or
        utilized.
      </p>
      <p>
        With the increasing volume of multi-parameter field investigation data,
        NASA recognizes the value of measurements collected during previous
        campaigns both for answering new science questions and for studying
        changes to Earth’s systems and processes over time. CASEI exists to
        expedite discovery, access, and utilization of archived investigation
        data, maximizing the return NASA’s investments.
      </p>
    </SectionBlock>

    <SectionBlock
      tagline="Responsible Organisation"
      headline="Airborne Data Management Group (ADMG) primary goal is to make sure that NASA airborne science data are discoverable and usable by the broader research community."
      withText
      id="about-organisation"
    >
      <p>
        NASA’s Airborne Data Management Group (ADMG) operates within the
        Interagency Implementation and Advanced Concepts Team (IMPACT) at
        Marshall Space Flight Center, under the direction of NASA’s Earth
        Science Data Systems (ESDS). The primary responsibility of ADMG is to
        support data producers and archivers with the task of ensuring NASA’s
        airborne and field investigation science data are discoverable and
        usable by various research communities. Additionally, the ADMG serves
        the airborne data user communities by providing resource access and key
        contextual information for past and current NASA airborne field
        investigations.
      </p>
    </SectionBlock>
  </Layout>
)

export default About
