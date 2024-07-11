import React, { useEffect, useState } from "react"

import { CloseIcon } from "../icons"
import { IconButton } from "./button"
import { POSITIVE, NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const SimpleBanner = () => {
  const [hasSeenWorkshopNotice, setHasSeenNotice] = useState(false)
  const [checkedLocalStorage, setCheckedLocalStorage] = useState(false)

  // This runs when the page is loaded.
  useEffect(() => {
    if (localStorage.getItem("has_seen_workshop_recording_banner")) {
      setHasSeenNotice(true)
    }
    setCheckedLocalStorage(true)
  }, [])

  const markWorkshopNoticeSeen = () => {
    localStorage.setItem("has_seen_workshop_recording_banner", "true")
    setHasSeenNotice(true)
  }

  return (
    <>
      <div
        css={`
          position: relative;
          background: ${colors[NEGATIVE].linkText};
          color: ${colors[POSITIVE].text};
          opacity: 0.95;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
          z-index: 400;
          display: ${hasSeenWorkshopNotice && checkedLocalStorage
            ? "none"
            : "flex"};
        `}
      >
        <div>
          <span>{`July update: Please note that session recordings from the 2024 Airborne & Field Data Workshop are now available`}</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.earthdata.nasa.gov/learn/webinars-and-tutorials/second-airborne-field-data-workshop`}
            css={`
              color: ${colors[POSITIVE].text};
              font-weight: bold;
            `}
            data-cy={`workshop-link`}
          >
            {"\u00a0here"}
          </a>
          <span>!</span>
        </div>
        <div
          css={`
            position: absolute;
            right: 15px;
            top: 17px;
          `}
        >
          <IconButton
            id="remove-filter"
            action={markWorkshopNoticeSeen}
            icon={<CloseIcon color={colors[POSITIVE].text} />}
          />
        </div>
      </div>
    </>
  )
}

export default SimpleBanner
