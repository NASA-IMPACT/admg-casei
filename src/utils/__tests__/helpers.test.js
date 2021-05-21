import { convertBoundsToNSWE } from "../helpers"

it("converts bounds to NSWE", () => {
  const input = [
    "SRID=4326;POLYGON ((115 20, 130 20, 130 5, 115 5, 115 20))",
    "SRID=4326;POLYGON ((-80 35, -70 35, -70 45, -80 45, -80 35))",
    "SRID=4326;POLYGON ((-127 27, -60 27, -60 50, -127 50, -127 27))",
  ]

  const output = [
    {
      N: "20°N",
      S: "5°N",
      W: "115°E",
      E: "130°E",
    },
    {
      N: "35°N",
      S: "45°N",
      W: "80°W",
      E: "70°W",
    },
    {
      N: "27°N",
      S: "50°N",
      W: "127°W",
      E: "60°W",
    },
  ]

  input.forEach((wkt, index) => {
    const nswe = convertBoundsToNSWE(wkt)
    expect(nswe).toEqual(output[index])
  })
})
