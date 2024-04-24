import React from "react"
import renderer from "react-test-renderer"
import { act } from "react-dom/test-utils"

import { MapLegend } from "../map"
import { LineIcon, CircleIcon } from "../../../icons"

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
          { name: "Campaign FS", type: "static" },
          { name: "Campaign FS", type: "static" },
        ]}
        platformsWithData={["Falcon", "Campaign FS"]}
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
    expect(instance.findByType(CircleIcon).props.size).toBe("extra-tiny")
  })
  it("render with one option selected", () => {
    const fn = jest.fn()
    const element = renderer.create(
      <MapLegend
        platforms={[
          { name: "Falcon", type: "Jet" },
          { name: "Falcon", type: "Jet" },
          { name: "Campaign FS", type: "static" },
        ]}
        selectedPlatforms={["Falcon"]}
        platformsWithData={["Falcon", "Campaign FS"]}
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
  })
  it("presents Not Shown on platforms without data", () => {
    const fn = jest.fn()
    const element = renderer.create(
      <MapLegend
        platforms={[
          { name: "Falcon", type: "Jet" },
          { name: "DC-8", type: "Jet" },
          { name: "Campaign FS", type: "static" },
        ]}
        selectedPlatforms={["Falcon"]}
        platformsWithData={["Falcon", "DC-8"]}
        setSelectedPlatforms={fn}
      />
    )
    const instance = element.root
    expect(instance.findAllByType("input").length).toBe(3)
    const [b1, b2, b3] = instance.findAllByType("input")
    expect(b1.props.checked).toBeTruthy()
    expect(b2.props.checked).toBeFalsy()
    expect(b3.props.checked).toBeFalsy()
    expect(b1.props.disabled).toBeTruthy()
    expect(b2.props.disabled).toBeFalsy()
    expect(b3.props.disabled).toBeTruthy()
    act(() => b2.props.onClick())
    expect(fn).toHaveBeenCalledTimes(1)
    expect(instance.findAllByType("u").length).toBe(1)
  })
})
