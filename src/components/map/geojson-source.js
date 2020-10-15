import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

export default function GeoJsonSource({ geojson, id, map, children }) {
  const [source, setSource] = useState(null)

  useEffect(() => {
    let s = map.getSource(`${id}-source`)
    if (!s) {
      s = map.addSource(`${id}-source`, {
        type: "geojson",
        data: geojson,
      })
    } else {
      s.setData(geojson)
    }

    setSource(s)

    return () => {
      // TODO: Error "Source "campaign-source" cannot be removed while layer "campaign-layer" is using it."
      // if (source) map.removeSource(`${id}-source`)
    }
  }, [geojson])

  return (
    <>
      {source &&
        children &&
        React.Children.map(children, child =>
          React.cloneElement(child, {
            sourceId: `${id}-source`,
            map: map,
          })
        )}
    </>
  )
}

GeoJsonSource.propTypes = {
  id: PropTypes.string.isRequired,
  geojson: PropTypes.object,
  map: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}
