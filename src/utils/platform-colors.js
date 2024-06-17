export const flightColors = platforms => {
  const colors = ["#F1EEF6", "#BDC9E1", "#74A9CF", "#2B8CBE", "#045A8D"]
  return platforms.map((i, index) => [i, colors[index]])
}

export const getLineColors = platforms => {
  const colors = flightColors(platforms)
  return [
    "match",
    ["get", "platform_name"],
    ...colors.flatMap(i => i),
    "#1a9b8c", // this is a fallback color
  ]
}
