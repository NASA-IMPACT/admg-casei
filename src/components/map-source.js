import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

export default function MapSource({ geojson, id, map, children }) {
  const [source, setSource] = useState(null)

  useEffect(() => {
    const s = map.addSource(`${id}-source`, {
      type: "geojson",
      data: geojson,
    })
    setSource(s)

    return () => {
      if (source) map.removeSource(`${id}-source`)
    }
  }, [])

  return (
    <>
      {source &&
        children &&
        React.Children.map(children, child =>
          React.cloneElement(child, {
            sourceId: `${id}-source`,
            map: map,
            geojson: geojson,
          })
        )}
    </>
  )
}

MapSource.propTypes = {
  id: PropTypes.string.isRequired,
  geojson: PropTypes.object,
  map: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}
