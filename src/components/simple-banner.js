import React, { useEffect, useState } from "react"

import { CloseIcon } from "../icons"
import { IconButton } from "./button"
import { POSITIVE } from "../utils/constants"
import { colors } from "../theme"
import ExternalLink from "./external-link"

const SimpleBanner = () => {
  const [hasSeenWorkshopNotice, setHasSeenNotice] = useState(false)

  // This runs when the page is loaded.
  useEffect(() => {
    if (localStorage.getItem("has_seen_workshop")) {
      setHasSeenNotice(true)
    }
  }, [])

  const markWorkshopNoticeSeen = () => {
    localStorage.setItem("has_seen_workshop", "true")
    setHasSeenNotice(true)
  }

  return (
    <>
      <div
        css={`
          position: relative;
          background: #ebba33;
          color: ${colors[POSITIVE].text};
          opacity: 0.95;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          z-index: 400;
          display: ${hasSeenWorkshopNotice ? "none" : "flex"};
        `}
      >
        <span>{`Please join us online 23-24 April for the 2024 NASA Airborne & Field Data Workshop! For more information and to register (free), click here!`}</span>
        <ExternalLink
          label={"here"}
          url={`https://www.earthdata.nasa.gov/learn/webinars-and-tutorials/second-airborne-field-data-workshop`}
          id="workshop"
        ></ExternalLink>
        <span>!</span>

        <IconButton
          id="remove-filter"
          action={markWorkshopNoticeSeen}
          icon={<CloseIcon color={colors[POSITIVE].text} />}
        />
      </div>
    </>
  )
}

export default SimpleBanner
