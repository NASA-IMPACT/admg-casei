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
    if (localStorage.getItem("has_seen_shutdown_banner")) {
      setHasSeenNotice(true)
    }
    setCheckedLocalStorage(true)
  }, [])

  const markWorkshopNoticeSeen = () => {
    localStorage.setItem("has_seen_shutdown_banner", "true")
    setHasSeenNotice(true)
  }

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
            <span>{`Due to the lapse in federal government funding, NASA is not updating this website. We sincerely regret this inconvenience.`}</span>
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
