import React from "react"
import renderer from "react-test-renderer"
import mapbox from "mapbox-gl"

import Map from "../map"
import MapSource from "../map-source"
import MapLayer from "../map-layer"

let mapWrapper
let container

describe("Map", () => {
  beforeEach(() => {
    renderer.act(() => {
      mapWrapper = renderer.create(
        <Map style={{ height: 200 }}>
          <MapSource id="test">
            <MapLayer id="test" />
          </MapSource>
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
let sourceWrapper, layerWrapper

describe("MapSource", () => {
  it("adds a map source", () => {
    renderer.act(() => {
      sourceWrapper = renderer.create(
        <MapSource id={sourceId} map={mapbox.Map()} geojson={geojson} />
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

describe("MapLayer", () => {
  beforeEach(() => {
    renderer.act(() => {
      layerWrapper = renderer.create(
        <MapLayer
          id={layerId}
          sourceId={sourceId}
          map={mapbox.Map()}
          geojson={geojson}
        />
      )
    })
  })
  it("adds a map layer", () => {
    expect(layerWrapper.toTree().props.map.addLayer).toHaveBeenCalledWith({
      id: `${layerId}-layer`,
      layout: {},
      paint: {
        "line-color": "hsla(0,0%,100%,0.9)",
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
          <MapLayer
            id="campaign"
            sourceId={sourceId}
            map={mapbox.Map()}
            geojson={geojson}
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
          <MapLayer
            id="explore"
            sourceId={sourceId}
            map={mapbox.Map()}
            geojson={geojson}
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
