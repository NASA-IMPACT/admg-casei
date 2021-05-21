import { convertBoundsToNSWE } from "../helpers"

it("converts bounds to NSWE", () => {
  const input = ["SRID=4326;POLYGON ((115 20, 130 20, 130 5, 115 5, 115 20))"]

  const output = [
    {
      N: "20°N",
      S: "5°N",
      W: "115°E",
      E: "130°E",
    },
  ]

  input.forEach((wkt, index) => {
    const nswe = convertBoundsToNSWE(wkt)
    expect(nswe).toEqual(output[index])
  })
})
