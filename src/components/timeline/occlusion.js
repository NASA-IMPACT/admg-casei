import * as d3 from "d3"

function intersect(a, b) {
  return !(
    a.x + a.width < b.x ||
    b.x + b.width < a.x ||
    a.y + a.height < b.y ||
    b.y + b.height < a.y
  )
}

export function occlusion(svg) {
  const labels = []
  svg.selectAll(".label").each((_datum, index, nodes) => {
    d3.select(nodes[index]).classed("occluded", false)
  })

  svg.selectAll(".label").each((_datum, index, nodes) => {
    const bbox = nodes[index].getBoundingClientRect()

    labels.push({
      priority: nodes[index].getAttribute("data-priority"),
      node: nodes[index],
      text: d3.select(nodes[index]).select("text").text(),
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
    })
  })

  labels.sort((a, b) => b.priority - a.priority)

  const filled = []

  for (const d of labels) {
    const isOccluded = filled.some(e => {
      return intersect(d, e)
    })
    d3.select(d.node).classed("occluded", isOccluded)
    if (!isOccluded) filled.push(d)
  }
  return filled
}
