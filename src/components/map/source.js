import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

export default function Source({ map, id, config, children }) {
  const [mapSource, setMapSource] = useState(null)

  useEffect(() => {
    let s = map.getSource(id)
    if (!s) {
      s = map.addSource(id, config)
    }

    setMapSource(s)

    return () => {
      React.Children.map(children, c => map.removeLayer(c.props.config.id))
      if (config) map.removeSource(id)
    }
  }, [])

  /*
   * Source id is passed to children
   */
  return (
    <>
      {mapSource &&
        children &&
        React.Children.map(children, child =>
          React.cloneElement(child, {
            map: map,
            sourceId: id,
          })
        )}
    </>
  )
}

Source.propTypes = {
  map: PropTypes.object,
  id: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  children: PropTypes.node,
}
