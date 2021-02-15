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
import theme from "../utils/theme"

const ListTrigger = styled(ListboxButton)`
  &[data-reach-listbox-button] {
    border: none;
    display: inherit;
    padding-right: 0.25rem;
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
      listRef.current.setAttribute("hidden", true)

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
              border-bottom: ${theme.color.base} 1px dashed;
            `}
          >
            <strong>{dates.length}</strong> {id}
            {dates.length !== 1 && "s"}
          </small>
        </ListTrigger>
        <ListboxPopover
          ref={listRef}
          onMouseEnter={() => {
            setIsOverList(true)
          }}
          onMouseLeave={() => {
            setIsOverList(false)
          }}
          css={`
            background: ${theme.color.base};
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
              <table>
                <tbody
                  css={`
                    overflow-y: scroll;
                    margin: 0 0.25rem;
                    color: ${theme.color.gray};
                  `}
                >
                  <tr
                    css={`
                      background-color: ${theme.color.lightGray};
                    `}
                  >
                    <th>
                      <label>Start Date</label>
                    </th>
                    <th>
                      <label>End Date</label>
                    </th>
                  </tr>
                  {dates.map(date => (
                    <tr
                      css={`
                        overflow-y: scroll;
                        margin: 0 0.25rem;
                      `}
                      key={date.id}
                    >
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
        </ListboxPopover>
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
