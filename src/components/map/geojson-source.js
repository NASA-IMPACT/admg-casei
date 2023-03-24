import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

// GeoJsonSource component
export default function GeoJsonSource({ geojson, id, map, children }) {
  const [source, setSource] = useState(null)

  // Effect to handle component unmounting
  useEffect(() => {
    // Clean up function to remove source from map when the component is unmounted
    return () => {
      // TODO Error: Source "explore-source" cannot be removed while layer "explore-hover-layer" is using it.
      map.removeSource(`${id}-source`)
    }
  }, [])

  // Effect to handle source updates based on geojson changes
  useEffect(() => {
    // Get the source from the map
    let s = map.getSource(`${id}-source`)

    // If the source doesn't exist, create a new source and add it to the map
    if (!s) {
      s = map.addSource(`${id}-source`, {
        type: "geojson",
        data: geojson,
      })
    } else {
      // If the source exists, update the data with the new geojson
      s.setData(geojson)
    }
    // Update the state with the new source
    setSource(s)
  }, [JSON.stringify(geojson)])

  // Render children components and pass the sourceId and map as props
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

// Define PropTypes for the GeoJsonSource component
GeoJsonSource.propTypes = {
  id: PropTypes.string.isRequired,
  geojson: PropTypes.object,
  map: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}
