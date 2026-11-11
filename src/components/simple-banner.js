import React, { useEffect, useState } from "react"

import { CloseIcon } from "../icons"
import { IconButton } from "./button"
import { POSITIVE, NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const SimpleBanner = () => {
  const [hasSeenNotice, setHasSeenNotice] = useState(false)
  const [checkedLocalStorage, setCheckedLocalStorage] = useState(false)

  // This runs when the page is loaded.
  useEffect(() => {
    if (localStorage.getItem("has_seen_closeout_banner")) {
      setHasSeenNotice(true)
    }
    setCheckedLocalStorage(true)
  }, [])

  const markWorkshopNoticeSeen = () => {
    localStorage.setItem("has_seen_closeout_banner", "true")
    setHasSeenNotice(true)
  }

  const FeedbackLink = () => (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfCQzZHtaDSiWNdwiJa3TIzsyhjEbYyyHwfrcwIKn_UmdVaKA/viewform"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#000", textDecoration: "underline" }}
    >
      welcome your feedback
    </a>
  )

  const EarthdataLink = () => (
    <a
      href="https://www.earthdata.nasa.gov/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#000", textDecoration: "underline" }}
    >
      Earthdata site
    </a>
  )

  const Paragraph = () => (
    <strong>
      We <FeedbackLink /> on what CASEI aspects would be most helpful to include
      in the broader NASA <EarthdataLink />.
    </strong>
  )

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
            & p:last-of-type {
              padding-top: 0.5rem;
            }
          `}
        >
          <div>
            <p>
              Airborne Data Management Group (ADMG) developed and built CASEI as
              part of its work as an inaugural NASA Satellite Needs Working
              Group (SNWG) Implementation Team (NSITE) Solution Team. Now that
              ADMG has reached formal closeout from NSITE/SNWG,{" "}
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
              process and driven by user input: <Paragraph />
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
