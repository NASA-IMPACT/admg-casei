import React, { useRef, useLayoutEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import parse from "wellknown"
import * as turf from "@turf/turf"
// import geoViewport from "@mapbox/geo-viewport"
import mapbox from "mapbox-gl"

import HeroStats from "../../components/hero-stats"

import { useContainerDimensions } from "../../utils/helpers"
import theme from "../../utils/theme"

const CampaignHero = ({
  bounds,
  shortname,
  longname,
  focusListing,
  countDeployments,
  countCollectionPeriods,
  countDataProducts,
}) => {
  const [map, setMap] = useState(null)
  const containerRef = useRef()

  const geometry = parse(bounds)
  const coordinates = geometry.coordinates.shift()
  const features = turf.featureCollection(
    coordinates.map(coor => turf.point(coor))
  )

  useLayoutEffect(() => {
    const m = new mapbox.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      zoom: 13,
      center: turf.center(features).geometry.coordinates,
    })
    m.on("load", () => {
      setMap(m)
    })

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])
  return (
    <section
      data-cy="campaign-hero"
      ref={containerRef}
      style={{ height: `35rem` }}
    ></section>
  )
}

export const heroFields = graphql`
  fragment heroFields on campaign {
    bounds: spatial_bounds
    shortname: short_name
    longname: long_name
    focus: focus_areas {
      shortname: short_name
    }
    countCollectionPeriods: number_collection_periods
    countDataProducts: number_data_products
    countDeployments: number_deployments
  }
`

CampaignHero.propTypes = {
  bounds: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
}

export default CampaignHero
