import React, { useEffect, useState } from "react"

import { CloseIcon } from "../icons"
import { IconButton } from "./button"
import { POSITIVE, NEGATIVE } from "../utils/constants"
import { colors } from "../theme"
import ExternalLink from "./external-link"

const SimpleBanner = () => {
  const [hasSeenNotice, setHasSeenNotice] = useState(false)
  const [checkedLocalStorage, setCheckedLocalStorage] = useState(false)

  // This runs when the page is loaded.
  useEffect(() => {
    if (localStorage.getItem("has_seen_shutdown_banner")) {
      setHasSeenNotice(true)
    }
    setCheckedLocalStorage(true)
  }, [])

  const markWorkshopNoticeSeen = () => {
    localStorage.setItem("has_seen_shutdown_banner", "true")
    setHasSeenNotice(true)
  }

  const feedbackLink = (
    <ExternalLink
      title="welcome your feedback"
      url="https://docs.google.com/forms/d/e/1FAIpQLSfCQzZHtaDSiWNdwiJa3TIzsyhjEbYyyHwfrcwIKn_UmdVaKA/viewform"
      target="_blank"
      id="feedback-link"
    />
  )

  const earthdataLink = (
    <ExternalLink
      title="Earthdata site"
      url="https://www.earthdata.nasa.gov/"
      target="_blank"
      id="earthdata-link"
    />
  )

  const paragraph = `We ${feedbackLink} on what CASEI aspects would be most helpful to
  include in the broader NASA ${earthdataLink}.`

  if (checkedLocalStorage) {
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
            display: ${hasSeenNotice ? "none" : "flex"};
          `}
        >
          <div>
            <p>
              Airborne Data Management Group (ADMG) developed and built CASEI as
              part of its work as an inaugural NASA Satellite Needs Working
              Group (SNWG) Implementation Team (NSITE) Solution Team. Now that
              ADMG has reached formal closeout from NSITE/SNWG,
              <strong>
                the CASEI resource (including API) is still being maintained and
                provisioned, but new content curation has ceased.
              </strong>
            </p>
            <p>
              Informed by CASEI&apos;s innovation, efforts are underway to
              represent suborbital metadata directly within the NASA ESDIS
              Earthdata Archive. Improvements to the Earthdata web presence for
              a more intuitive approach to suborbital campaigns are part of this
              process and driven by user input:
              <strong>{paragraph}</strong>
            </p>
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
  } else {
    return <></>
  }
}

export default SimpleBanner
