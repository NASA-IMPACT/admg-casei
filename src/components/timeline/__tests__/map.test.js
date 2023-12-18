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
        selectedPlatform={""}
        setSelectedPlatform={fn}
      />
    )
    const instance = element.root
    expect(instance.findAllByType("button").length).toBe(2)
    const b1 = instance.findAllByType("button")[0]
    expect(
      instance.findAllByType("button").every(i => !i.props.selected)
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
        selectedPlatform={"Falcon"}
        setSelectedPlatform={fn}
      />
    )
    const instance = element.root
    expect(instance.findAllByType("button").length).toBe(2)
    const [b1, b2] = instance.findAllByType("button")
    expect(b1.children[0].props.selected).toBeTruthy()
    expect(b2.children[0].props.selected).toBeFalsy()
    act(() => b1.props.onClick())
    expect(fn).toHaveBeenCalledTimes(1)
    act(() => b2.props.onClick())
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
