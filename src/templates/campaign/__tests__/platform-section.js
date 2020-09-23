import React from "react"
import { create } from "react-test-renderer"

import PlatformSection from "../platform-section"
jest.mock("../../../components/image", () => {
  const mockImage = () => <img />
  return mockImage
})

const testArray = [
  {
    id: "d59b3d7e-f782-4e25-a8eb-ceec91c0331e",
    shortname: "DC-8",
    longname: "Douglas DC-8",
    image: {
      nasaImgAlt: "alt-text",
      nasaImg: {
        childImageSharp: {
          fluid: () => {},
        },
      },
    },
    instruments: [
      {
        id: "a1f41f4d-2233-49be-a3d3-6eda1ded6be4",
        shortname: "Gen-Chemistry",
      },
      {
        id: "d5e31d80-a0d9-4d5b-95e1-e10714ec7970",
        shortname: "DAWN",
      },
      {
        id: "c40cc568-c4eb-4605-a3bc-f9027ad538a6",
        shortname: "PTR-MS",
      },
      {
        id: "f095abde-d0eb-4d00-b33b-549b37c28dca",
        shortname: "CIT-CIMS",
      },
      {
        id: "fdec9678-fd19-48b9-a30f-b0c2d8503c82",
        shortname: "AVOCET",
      },
      {
        id: "eaabd936-b6ae-4136-b160-90ef5f629da4",
        shortname: "Nephelometer",
      },
    ],
  },
  {
    id: "1b607095-4f6d-4e70-8e16-798bc59a2d59",
    shortname: "B-200",
    longname: "Beechcraft King Air B-200",
    image: {
      nasaImgAlt: "alt-text",
      nasaImg: {
        childImageSharp: {
          fluid: () => {},
        },
      },
    },
    instruments: [
      {
        id: "aa6e3d99-17ca-4b4e-9130-c6e0b0864fd9",
        shortname: "HSRL",
      },
      {
        id: "7c2a6034-9983-4308-a81b-e9fd538c3dd3",
        shortname: "RSP",
      },
    ],
  },
  {
    id: "2084ab0c-4f18-4aa6-ad7b-70bc861d2d80",
    shortname: "P-3",
    longname: "P-3 Orion",
    image: {
      nasaImgAlt: "alt-text",
      nasaImg: {
        childImageSharp: {
          fluid: () => {},
        },
      },
    },
    instruments: [
      {
        id: "a1f41f4d-2233-49be-a3d3-6eda1ded6be4",
        shortname: "Gen-Chemistry",
      },
      {
        id: "edf760b9-d2b4-4ce5-8524-31268e6532fc",
        shortname: "PSAP",
      },
      {
        id: "3e5c6687-3a1c-40f5-95ed-49eb3248aea7",
        shortname: "TE49C",
      },
    ],
  },
]

describe("Platform Section", () => {
  it("displays content", () => {
    const tree = create(
      <PlatformSection
        id="platform"
        platforms={testArray}
        instruments={[
          {
            id: "a1f41f4d-2233-49be-a3d3-6eda1ded6be4",
          },
          {
            id: "aa6e3d99-17ca-4b4e-9130-c6e0b0864fd9",
          },
        ]}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
