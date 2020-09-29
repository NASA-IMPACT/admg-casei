import React, { useRef, useLayoutEffect, useState } from "react"
import mapbox from "mapbox-gl"

export default function Map({ style }) {
  const containerRef = useRef()
  const [map, setMap] = useState(null)

  useLayoutEffect(() => {
    mapbox.accessToken = process.env.GATSBY_MAPBOX_TOKEN
    const m = new mapbox.Map({
      container: containerRef.current,
      style: `mapbox://styles/mapbox/satellite-streets-v11/`,
      zoom: 1,
      center: [0, 0],
    })

    // m.on("load", () => {
    //   m.addSource("campaign-bbox", {
    //     type: "geojson",
    //     data: {
    //       type: "Feature",
    //       properties: {
    //         stroke: "#f25d0d",
    //         "stroke-width": 2,
    //         "fill-opacity": 0,
    //       },
    //       geometry: {
    //         type: "Polygon",
    //         coordinates: coordinates,
    //       },
    //     },
    //   })
    //   m.addLayer({
    //     id: "campaign-bbox",
    //     type: "line",
    //     source: "campaign-bbox",
    //     layout: {},
    //     paint: {
    //       "line-color": "#f25d0d",
    //       "line-opacity": 0.8,
    //       "line-width": 2,
    //     },
    //   })
    // })
    setMap(m)

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  return <div style={style} ref={containerRef} />
}
