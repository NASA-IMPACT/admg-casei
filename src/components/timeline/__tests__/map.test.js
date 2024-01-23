import React from "react"
import renderer from "react-test-renderer"
import { act } from "react-dom/test-utils"

import { MapLegend } from "../map"
import { LineIcon, CircleIcon } from "../../../icons"

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
})
