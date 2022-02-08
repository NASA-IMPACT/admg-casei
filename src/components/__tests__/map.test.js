import React from "react"
import renderer from "react-test-renderer"
import mapbox from "mapbox-gl"

import Map from "../map"
import GeoJsonSource from "../map/geojson-source"
import BboxLayer from "../map/bbox-layer"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

let mapWrapper
let container

describe("Map", () => {
  beforeEach(() => {
    renderer.act(() => {
      mapWrapper = renderer.create(
        <Map height={200}>
          <GeoJsonSource id="test">
            <BboxLayer id="test" bbox={[32, 5, 35, 10]} />
          </GeoJsonSource>
        </Map>,
        {
          createNodeMock: element => {
            container = element
            return element
          },
        }
      )
    })
  })

  it("renders correctly", () => {
    expect(mapWrapper.toJSON()).toMatchSnapshot()
  })

  it("adds a map", () => {
    expect(mapbox.Map).toHaveBeenCalledWith({
      container,
      style: `mapbox://styles/mapbox/satellite-streets-v11/`,
      zoom: 1,
      center: [0, 0],
    })
  })
})

const sourceId = "test-source"
const layerId = "test-layer"
const geojson = {
  type: "FeatureCollection",
  features: [],
}
const bbox = [32, 5, 35, 10]
let sourceWrapper, layerWrapper

describe("GeoJsonSource", () => {
  it("adds a map source", () => {
    renderer.act(() => {
      sourceWrapper = renderer.create(
        <GeoJsonSource id={sourceId} map={mapbox.Map()} geojson={geojson} />
      )
    })

    expect(sourceWrapper.toTree().props.map.addSource).toHaveBeenCalledWith(
      `${sourceId}-source`,
      {
        type: "geojson",
        data: geojson,
      }
    )
  })
})

describe("BboxLayer", () => {
  beforeEach(() => {
    renderer.act(() => {
      layerWrapper = renderer.create(
        <BboxLayer
          id={layerId}
          bbox={bbox}
          sourceId={sourceId}
          map={mapbox.Map()}
        />
      )
    })
  })
  it("adds a map layer", () => {
    expect(layerWrapper.toTree().props.map.addLayer).toHaveBeenCalledWith({
      id: `${layerId}-layer`,
      layout: {},
      paint: {
        "line-color": colors[NEGATIVE].text,
        "line-opacity": 0.8,
        "line-width": 2,
      },
      source: sourceId,
      type: "line",
    })
  })

  //ensure switch is working as expected with "campaign", "explore" or "test"
  it("does not zoom to the data", () => {
    expect(layerWrapper.toTree().props.map.flyTo).not.toHaveBeenCalled()
  })

  describe("when id is 'campaign'", () => {
    it("zooms to the data", () => {
      renderer.act(() => {
        layerWrapper = renderer.create(
          <BboxLayer
            id="campaign"
            bbox={bbox}
            sourceId={sourceId}
            map={mapbox.Map()}
          />
        )
      })

      expect(layerWrapper.toTree().props.map.flyTo).toHaveBeenCalledWith({
        center: [-73.5804, 45.53483],
        pitch: 60,
        bearing: -60,
        zoom: 10,
      })
    })
  })

  describe("when id is 'explore'", () => {
    it("zooms to the data", () => {
      renderer.act(() => {
        layerWrapper = renderer.create(
          <BboxLayer
            id="explore"
            bbox={bbox}
            sourceId={sourceId}
            map={mapbox.Map()}
          />
        )
      })

      expect(layerWrapper.toTree().props.map.flyTo).toHaveBeenCalledWith({
        center: [-73.5804, 45.53483],
        pitch: 60,
        bearing: -60,
        zoom: 10,
      })
    })
  })
})
