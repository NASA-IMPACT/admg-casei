// we need to mock the mapbox gl library,
// see https://github.com/mapbox/mapbox-gl-js/issues/3436

module.exports = {
  AttributionControl: jest.fn(),
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    addLayer: jest.fn(),
    addSource: jest.fn(),
    dragRotate: { disable: jest.fn() },
    getLayer: jest.fn(() => "layer"),
    getSource: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
    resize: jest.fn(),
    scrollZoom: { disable: jest.fn() },
    setFilter: jest.fn(),
    setPaintProperty: jest.fn(),
    touchZoomRotate: { disableRotation: jest.fn() },
  })),
  NavigationControl: jest.fn(),
  addControl: jest.fn(),
}
