import React, { useRef, useEffect } from "react"
import { Timeline } from "@knight-lab/timelinejs"
import "@knight-lab/timelinejs/dist/css/timeline.css"

export const CampaignsTimeline = ({}) => {
  const timelineEl = useRef(null)
  useEffect(() => {
    const additionalOptions = {
      font: "'Titillium Web', Titillium Web",
      default_bg_color: { r: 0, g: 0, b: 0 },
    }
    if (timelineEl.current != null) {
      new Timeline(
        timelineEl.current,
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmIN5sxyLqgSpahykwDYbU118zJePOIc8_L5I8eQ5Vwn9vhn0wgmkXo2Xzh_IcptPrUryGxB5ianzM/pubhtml",
        additionalOptions
      )
    }
  }, [])
  return (
    <div
      css={`
        height: 600px;
      `}
      ref={timelineEl}
      className="timeline"
    />
  )
}
