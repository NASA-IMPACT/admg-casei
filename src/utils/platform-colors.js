export const flightPathColors = platforms => {
  const colors = [
    "#b2df8a",
    "#33a02c",
    "#fdbf6f",
    "#ff7f00",
    "#a6cee3",
    "#1f78b4",
    "#fb9a99",
    "#e31a1c",
  ]
  return platforms.map((i, index) => [i, colors[index]])
}

export const getLineColors = platforms => {
  const colors = flightPathColors(platforms)
  return [
    "match",
    ["get", "platform_name"],
    ...colors.flatMap(i => i),
    "#1a9b8c", // this is a fallback color
  ]
}
