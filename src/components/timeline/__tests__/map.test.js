import React from "react"
import renderer, { act } from "react-test-renderer"

import { MapLegend, PlatformStatus } from "../map"
import { LineIcon } from "../../../icons"
import {
  BalloonIcon,
  FieldSiteIcon,
} from "../../../icons/static-platform-icons"

jest.mock("react-tooltip", () => ({
  Tooltip: () => <div>Mocked tooltip</div>,
}))

describe("MapLegend", () => {
  it("render options", () => {
    const fn = jest.fn()
    const element = renderer.create(
      <MapLegend
        platforms={[
          { name: "Falcon", type: "Jet" },
          { name: "Field Site", type: "static" },
          { name: "Field Site", type: "static" },
        ]}
        platformsWithData={["Falcon", "Field Site"]}
        selectedPlatforms={[]}
        setSelectedPlatforms={fn}
      />
    )
    const instance = element.root
    expect(instance.findAllByType("input").length).toBe(2)
    const b1 = instance.findAllByType("input")[0]
    expect(
      instance.findAllByType("input").every(i => !i.props.checked)
    ).toBeTruthy()
    act(() => b1.props.onClick())
    expect(fn).toHaveBeenCalledTimes(1)
    expect(instance.findByType(LineIcon).props.size).toBe("text")
    expect(instance.findByType(FieldSiteIcon)).toBeTruthy()
  })
  it("render with one option selected", () => {
    const fn = jest.fn()
    const element = renderer.create(
      <MapLegend
        platforms={[
          { name: "Falcon", type: "Jet" },
          { name: "Falcon", type: "Jet" },
          { name: "Balloon Launch Site", type: "static" },
        ]}
        selectedPlatforms={["Falcon"]}
        platformsWithData={["Falcon", "Balloon Launch Site"]}
        setSelectedPlatforms={fn}
      />
    )
    const instance = element.root
    expect(instance.findAllByType("input").length).toBe(2)
    const [b1, b2] = instance.findAllByType("input")
    expect(b1.props.checked).toBeTruthy()
    expect(b2.props.checked).toBeFalsy()
    act(() => b1.props.onClick())
    expect(fn).toHaveBeenCalledTimes(1)
    act(() => b2.props.onClick())
    expect(fn).toHaveBeenCalledTimes(2)
    expect(instance.findByType(BalloonIcon)).toBeTruthy()
  })
})

describe("PlatformStatus", () => {
  it("does not render anything if platform is operational", () => {
    let element
    act(() => {
      element = renderer.create(
        <PlatformStatus
          platformName="DC-8"
          platformsWithData={["DC-8", "Learjet"]}
          activeDeploymentPlatforms={["DC-8"]}
        />
      )
    })
    const instance = element.root
    expect(instance.findAllByType("div").length).toBe(0)
  })
  it("renders Not Shown if it does not have platform data", () => {
    let element
    act(() => {
      element = renderer.create(
        <PlatformStatus
          platformName="DC-8"
          platformsWithData={[]}
          activeDeploymentPlatforms={["DC-8"]}
        />
      )
    })
    const instance = element.root
    expect(
      instance.findByProps({ "data-tooltip-id": "tooltip-DC-8" }).children
    ).toEqual(["(Not Shown)"])
  })
  it("renders Not Operating if it is not in the active deployment", () => {
    let element
    act(() => {
      element = renderer.create(
        <PlatformStatus
          platformName="Learjet"
          platformsWithData={["Learjet"]}
          activeDeploymentPlatforms={["DC-8"]}
        />
      )
    })
    const instance = element.root
    expect(
      instance.findByProps({ "data-tooltip-id": "tooltip-Learjet" }).children
    ).toEqual(["(Not Operating)"])
  })
})
