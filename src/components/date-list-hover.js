import React, { useState, useRef, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"
import styled from "styled-components"
import { colors } from "../utils/theme"
import { POSITIVE } from "../utils/constants"

const ListTrigger = styled(ListboxButton)`
  &[data-reach-listbox-button] {
    border: none;
    display: inherit;
    padding-right: 0.25rem;
  }
`

const Popover = styled(ListboxPopover)`
  &[data-reach-listbox-popover] {
    z-index: 99;

    /* :hover {
      opacity: 1 !important;
      background-color: pink;
    } */
  }
`

const DateList = ({ id, dates }) => {
  let [isOverButton, setIsOverButton] = useState(false)
  let [isOverList, setIsOverList] = useState(false)
  let [isOpen, setIsOpen] = useState()

  let triggerRef = useRef(null)
  let listRef = useRef(null)

  useLayoutEffect(() => {
    if (isOpen && !isOverButton && !isOverList) {
      triggerRef.current.setAttribute("data-state", "closed")
      listRef.current.setAttribute("hidden", "")

      setIsOpen(false)
    } else if (!isOpen && (isOverButton || isOverList)) {
      triggerRef.current.setAttribute("data-state", "expanded")

      listRef.current.removeAttribute("hidden")

      setIsOpen(true)
    }
  }, [isOverButton, isOverList])

  return (
    <>
      <VisuallyHidden id={`${id}-hover-list`}>
        view all deployment dates
      </VisuallyHidden>
      <ListboxInput
        name={`${id}-hover-list`}
        aria-labelledby={`${id}-hover-list`}
        data-cy={`${id}-hover-list`}
        ref={triggerRef}
      >
        <ListTrigger
          onMouseEnter={() => {
            setIsOverButton(true)
          }}
          onMouseLeave={() => {
            setIsOverButton(false)
          }}
          onKeyDown={() => {
            setIsOpen(!isOpen)
          }}
        >
          <small
            css={`
              white-space: nowrap;
              border-bottom: ${colors[POSITIVE].background} 1px dashed;
            `}
          >
            <strong>{dates.length}</strong> {id}
            {dates.length !== 1 && "s"}
          </small>
        </ListTrigger>
        <Popover
          ref={listRef}
          onMouseEnter={() => {
            setIsOverList(true)
          }}
          onMouseLeave={() => {
            setIsOverList(false)
          }}
          portal={false}
          css={`
            background: ${colors[POSITIVE].background};
            min-width: fit-content;
          `}
        >
          <ListboxList>
            <label
              css={`
                padding: 1rem;
                color: #000;
                font-size: large;
              `}
            >
              Deployment Dates
            </label>
            {dates.length ? (
              <table
                css={`
                  color: ${colors[POSITIVE].text};
                `}
              >
                <thead
                  css={`
                    display: table;
                    margin: 1rem;
                  `}
                >
                  <tr
                    css={`
                      background-color: ${colors[POSITIVE].background};
                    `}
                  >
                    <th>
                      <label>Start Date</label>
                    </th>
                    <th>
                      <label>End Date</label>
                    </th>
                  </tr>
                </thead>
                <tbody
                  css={`
                    overflow-y: scroll;
                    max-height: 10rem;
                    display: block;
                    margin: 1rem;
                  `}
                >
                  {dates.map(date => (
                    <tr key={date.id}>
                      <td>{date.startdate}</td>
                      <td>{date.enddate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                css={`
                  color: #000;
                  text-align: center;
                `}
              >
                none found
              </div>
            )}
          </ListboxList>
        </Popover>
      </ListboxInput>
    </>
  )
}

DateList.propTypes = {
  id: PropTypes.string.isRequired,
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startdate: PropTypes.string,
      enddate: PropTypes.string,
    }).isRequired
  ),
}

export default DateList
