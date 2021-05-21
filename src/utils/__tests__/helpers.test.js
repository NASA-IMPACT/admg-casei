import { convertBoundsToNSWE } from "../helpers"

it("converts bounds to NSWE", () => {
  const input = [
    // NE hemisphere test case
    "SRID=4326;POLYGON ((115 20, 130 20, 130 5, 115 5, 115 20))",
    // NW hemisphere test case
    "SRID=4326;POLYGON ((-80 35, -70 35, -70 45, -80 45, -80 35))",
    // SE hemisphere test case
    "SRID=4326;POLYGON ((115 -3, 130 -3, 130 -10, 115 -10, 115 -3))",
    // SW hemisphere test case
    "SRID=4326;POLYGON ((-80 -22, -70 -22, -70 -15, -80 -15, -80 -22))",
    // Cross hemisphere test case
    "SRID=4326;POLYGON ((-10 -12, 15 -12, 15 6, -10 6, -10 -12))",
    // Null island
    "SRID=4326;POLYGON ((0 0, 0 0, 0 0, 0 0, 0 0))",
  ]

  const output = [
    {
      N: "20°N",
      S: "5°N",
      W: "115°E",
      E: "130°E",
    },
    {
      N: "45°N",
      S: "35°N",
      W: "80°W",
      E: "70°W",
    },
    {
      N: "3°S",
      S: "10°S",
      W: "115°E",
      E: "130°E",
    },
    {
      N: "15°S",
      S: "22°S",
      W: "80°W",
      E: "70°W",
    },
    {
      N: "6°N",
      S: "12°S",
      W: "10°W",
      E: "15°E",
    },
    {
      N: "0°",
      S: "0°",
      W: "0°",
      E: "0°",
    },
  ]

  input.forEach((wkt, index) => {
    const nswe = convertBoundsToNSWE(wkt)
    expect(nswe).toEqual(output[index])
  })
})
