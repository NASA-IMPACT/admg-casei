import React from "react"
import { create } from "react-test-renderer"
import * as Gatsby from "gatsby"

import PlatformSection from "../platform-section"

const cdpis = [
  {
    id: "b62536a8-117c-4818-a60c-5ff3eaeaa2e3",
    platform: {
      shortname: "J-31",
      longname: "Jetstream-31",
      id: "dfb8cbd6-c33c-47df-9249-8949de2b81d7",
      description:
        "The Jetstream 31 and the Jetstream 32 are 19-seat turboprop airliners in operation worldwide. The aircraft is suited for conversion for special operations \nconfigurations, for example military communications and exclusive economic zone patrol.",
      collectionPeriodIds: ["b62536a8-117c-4818-a60c-5ff3eaeaa2e3"],
      campaigns: [
        {
          id: "1b0fd195-f46f-4d7a-8874-4225cec7c589",
        },
      ],
      instruments: [
        {
          id: "b02a8891-c45c-4479-b3cc-3683a6ee179b",
          shortname: "CAR",
        },
      ],
      stationary: false,
    },
    instruments: [
      {
        id: "b02a8891-c45c-4479-b3cc-3683a6ee179b",
        shortname: "CAR",
      },
    ],
  },
  {
    id: "ec826889-bf36-48a8-a62e-ed0aa12e31ab",
    platform: {
      shortname: "Aerosonde",
      longname: "Aerosonde Small Unmanned Aircraft System",
      id: "8b97267c-bc15-4744-90a3-043dc20a76e8",
      description:
        "The Aerosonde is a small, autonomous, high performance, high endurance, expeditionary unmanned aerial system. The air vehicle and its core systems are incredibly robust, with mission success of supporting flights into the eye of several different hurricanes and tropical storms.",
      collectionPeriodIds: ["ec826889-bf36-48a8-a62e-ed0aa12e31ab"],
      campaigns: [
        {
          id: "bb3806f5-af3c-46cc-ae6f-6065aa51851d",
        },
      ],
      instruments: [
        {
          id: "7cda54ad-e12e-4cf0-9c13-f4f601c3075c",
          shortname: "Pyrometer",
        },
        {
          id: "9fa2d277-d5ec-4234-ba8e-9ccb45762a04",
          shortname: "Vaisala RS902 sonde",
        },
      ],
      stationary: false,
    },
    instruments: [
      {
        id: "7cda54ad-e12e-4cf0-9c13-f4f601c3075c",
        shortname: "Pyrometer",
      },
    ],
  },
]

const testArray = [
  {
    shortname: "J-31",
    longname: "Jetstream-31",
    id: "dfb8cbd6-c33c-47df-9249-8949de2b81d7",
    description:
      "The Jetstream 31 and the Jetstream 32 are 19-seat turboprop airliners in operation worldwide. The aircraft is suited for conversion for special operations \nconfigurations, for example military communications and exclusive economic zone patrol.",
    collectionPeriodIds: ["b62536a8-117c-4818-a60c-5ff3eaeaa2e3"],
    campaigns: [
      {
        id: "1b0fd195-f46f-4d7a-8874-4225cec7c589",
      },
    ],
    instruments: [
      {
        id: "b02a8891-c45c-4479-b3cc-3683a6ee179b",
        shortname: "CAR",
      },
    ],
    stationary: false,
  },
  {
    shortname: "Aerosonde",
    longname: "Aerosonde Small Unmanned Aircraft System",
    id: "8b97267c-bc15-4744-90a3-043dc20a76e8",
    description:
      "The Aerosonde is a small, autonomous, high performance, high endurance, expeditionary unmanned aerial system. The air vehicle and its core systems are incredibly robust, with mission success of supporting flights into the eye of several different hurricanes and tropical storms.",
    collectionPeriodIds: ["ec826889-bf36-48a8-a62e-ed0aa12e31ab"],
    campaigns: [
      {
        id: "bb3806f5-af3c-46cc-ae6f-6065aa51851d",
      },
    ],
    instruments: [
      {
        id: "7cda54ad-e12e-4cf0-9c13-f4f601c3075c",
        shortname: "Pyrometer",
      },
      {
        id: "9fa2d277-d5ec-4234-ba8e-9ccb45762a04",
        shortname: "Vaisala RS902 sonde",
      },
    ],
    stationary: false,
  },
  {
    shortname: "C-23 Sherpa",
    longname: "Short Brothers C-23 Sherpa",
    id: "1854d7b1-53c3-4ed4-8180-8f5bd6e4fd26",
    description:
      "C-23 Sherpa is a two-engine turboprop aircraft which is owned and operated by GSFC/WFF. primarily used for airborne science research, providing logistics support for various NASA missions and is sometimes used as a technology test bed for new airborne instrumentation",
    collectionPeriodIds: [
      "e321b71d-3f76-484b-b851-57a01881418e",
      "6eaba698-579d-46f9-b201-85a2b726bda4",
      "b6fc964e-2edd-4e2f-8b85-0b07cbd32fa4",
      "ce35559d-ad21-45d8-a450-3879a37c71c6",
    ],
    campaigns: [
      {
        id: "c00b9ed9-03dc-4068-8cc8-c7454f6c8076",
      },
    ],
    instruments: [
      {
        id: "29fdc8f7-e945-4cc6-afd6-569a22a7bc8a",
        shortname: "Picarro",
      },
      {
        id: "d4d4a305-7730-4cf1-94d8-fa67f0b143ab",
        shortname: "FLIR",
      },
      {
        id: "9414d6bc-0c1b-47e4-97a7-144b67b06744",
        shortname: "PFP",
      },
      {
        id: "e5c5ddac-3025-48b1-84fe-3e42b32d0eca",
        shortname: "PALS",
      },
      {
        id: "cd653605-4b2b-4f2d-847e-78dcb5a81331",
        shortname: "FTS",
      },
      {
        id: "15a442ba-c117-442a-a7cf-01fc9267d13b",
        shortname: "DADS",
      },
    ],
    stationary: false,
  },
]

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery")
useStaticQuery.mockImplementation(() => ({
  allPlatform: {
    nodes: testArray,
  },
}))

describe("Platform Section", () => {
  it("displays content", () => {
    const tree = create(
      <PlatformSection id="platform" collectionPeriods={cdpis} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
