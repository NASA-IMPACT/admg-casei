import { convertBoundsToNSWE } from "../helpers"

it("converts bounds to NSWE", () => {
  const input = [
    // NE hemisphere test case
    [115, 5, 130, 20],
    // NW hemisphere test case
    [-80, 35, -70, 45],
    // SE hemisphere test case
    [115, -10, 130, -3],
    // SW hemisphere test case
    [-80, -22, -70, -15],
    // Cross hemisphere test case
    [-10, -12, 15, 6],
    // Null island
    [0, 0, 0, 0],
    // Overly precise coordinates
    [-73.6, 59.1, -6.9, 83.6],
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
    {
      E: "6.9°W",
      N: "83.6°N",
      S: "59.1°N",
      W: "73.6°W",
    },
  ]

  input.forEach((wkt, index) => {
    const nswe = convertBoundsToNSWE(wkt)
    expect(nswe).toEqual(output[index])
  })
})
