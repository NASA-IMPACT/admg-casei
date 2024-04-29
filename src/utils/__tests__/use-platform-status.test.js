import { renderHook } from "@testing-library/react-hooks"
import { usePlatformStatus } from "../use-platform-status"

describe("usePlatformStatus", () => {
  it("returns operational if platforms is active and has data", () => {
    const { result } = renderHook(() =>
      usePlatformStatus("DC-8", ["DC-8"], ["DC-8"])
    )
    expect(result.current).toBe("operational")
  })
  it("returns notShown if platforms is active but does not have data", () => {
    const { result } = renderHook(() => usePlatformStatus("DC-8", [], ["DC-8"]))
    expect(result.current).toBe("notShown")
  })
  it("returns notOperational if platforms is not active", () => {
    const { result } = renderHook(() =>
      usePlatformStatus("DC-8", ["DC-8"], ["Learjet"])
    )
    expect(result.current).toBe("notOperational")
  })
  it("returns notOperational if platforms is not active and does not have data", () => {
    const { result } = renderHook(() =>
      usePlatformStatus("DC-8", ["Learjet"], ["Learjet"])
    )
    expect(result.current).toBe("notOperational")
  })
})
