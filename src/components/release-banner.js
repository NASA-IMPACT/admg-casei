import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { CloseIcon } from "../icons"
import Button, { IconButton } from "./button"
import { Modal } from "./modal"
import { FEEDBACK_FORM_URL, POSITIVE } from "../utils/constants"
import { colors } from "../theme"

const Component = styled.div`
  width: 25rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  max-height: 720px;
  border-radius: 3px;
  background: #f2f7fb;
  pointer-events: auto;
  color: ${colors[POSITIVE].text};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ReleaseBanner = () => {
  const [hasSeenNotice, setHasSeenNotice] = useState(false)
  const [isModalOpen, setModal] = useState(false)

  // This runs when the page is loaded.
  useEffect(() => {
    if (localStorage.getItem("has_seen_notice")) {
      setHasSeenNotice(true)
    }
  }, [])

  const markReleaseNoticeSeen = () => {
    localStorage.setItem("has_seen_notice", "true")
    setHasSeenNotice(true)
    setModal(false)
  }

  const ModalBody = () => (
    <Component>
      <p>
        July 2023 Update! While CASEI has been publicly available in beta mode
        since 2021, there is now a majority (65%) of known NASA airborne and
        field campaigns represented across the database and a unique range of
        search/browse functionality built into CASEI and its API.
      </p>
      <br />
      <p>
        As you explore CASEI in this full-release version, keep in mind that
        additional campaigns, platforms, instruments, and data products are
        still being curated. We welcome
        <button
          css={`
            background: none;
            color: inherit;
            border: none;
            padding: 0 0 0 4px;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            text-transform: lowercase;
            text-decoration: underline;
            &:hover {
              opacity: 0.8;
            }
          `}
          onClick={() => {
            markReleaseNoticeSeen()
            window.open(FEEDBACK_FORM_URL, "_blank")
          }}
        >
          your feedback
        </button>
        !
      </p>
      <br />
      <Button action={markReleaseNoticeSeen}>okay</Button>
    </Component>
  )

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
          display: ${hasSeenNotice ? "none" : "flex"};
        `}
      >
        {`July 2023 Update! While CASEI has been publicly available in beta mode
          since 2021, we are launching our `}
        <button
          css={`
            background: none;
            color: inherit;
            border: none;
            padding: 0 0 0 4px;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            text-transform: lowercase;
            text-decoration: underline;
            &:hover {
              opacity: 0.8;
            }
          `}
          onClick={() => {
            setModal(true)
          }}
        >
          {" "}
          full-release version
        </button>
        <IconButton
          id="remove-filter"
          action={markReleaseNoticeSeen}
          icon={<CloseIcon color={colors[POSITIVE].text} />}
        />
      </div>
      <Modal
        id="modal"
        isOpen={isModalOpen}
        handleClose={() => setModal(false)}
        Custom={ModalBody}
      ></Modal>
    </>
  )
}

ReleaseBanner.propTypes = {}

export default ReleaseBanner
