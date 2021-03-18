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
import { colors } from "../theme"
import { NEGATIVE, POSITIVE } from "../utils/constants"
import { scrollFade } from "../theme/style-helpers"

const ListTrigger = styled(ListboxButton)`
  &[data-reach-listbox-button] {
    border: none;
    display: inherit;
    padding: 0 0.25rem 0 0;
    cursor: pointer;
  }
`

const Popover = styled(ListboxPopover)`
  &[data-reach-listbox-popover] {
    z-index: 99;
    position: relative;
    border: none;
    background: none;
    padding: 0;
  }
`

const CustomListBox = styled(ListboxList)`
  &[data-reach-listbox-list] {
    list-style: none;
    bottom: -30px;
    left: ${props => (props.iscustomspacing ? `7rem` : `100%`)};
    position: absolute;
    background: white;
    padding: 0.25rem 0;
    min-width: 14rem;
  }
`

const DateText = styled.td`
  padding-top: 0;
  padding-right: 0;
`
const DateList = ({
  id,
  index,
  title,
  dates,
  isStat,
  isCustomSpacing,
  cardMode = NEGATIVE,
}) => {
  let [isOverButton, setIsOverButton] = useState(false)
  let [isOverList, setIsOverList] = useState(false)
  let [isOpen, setIsOpen] = useState()

  let triggerRef = useRef(null)
  let listRef = useRef(null)

  const hoverListMode = POSITIVE

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
              border-bottom: ${colors[cardMode].text} 1px dashed;
            `}
            data-cy={`count${index + 1}`}
          >
            {!isStat && <strong>{dates.length}</strong>} {title}
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
            background: ${colors[hoverListMode].background};
            min-width: fit-content;
          `}
        >
          <CustomListBox iscustomspacing={isCustomSpacing && "true"}>
            <label
              css={`
                padding: 0 0.5rem;
                color: ${colors[hoverListMode].text};
                font-size: large;
              `}
            >
              Deployment Dates
            </label>
            {dates.length ? (
              <table
                css={`
                  color: ${colors[hoverListMode].text};
                  margin-bottom: 0;
                `}
              >
                <thead
                  css={`
                    display: table;
                    width: 100%;
                  `}
                >
                  <tr
                    css={`
                      background-color: ${colors[hoverListMode].altBackground};
                      color: ${colors[hoverListMode].altText};
                    `}
                  >
                    <th
                      css={`
                        padding: 0 0.5rem;
                        max-width: 4rem;
                      `}
                    >
                      <label>Start Date</label>
                    </th>
                    <th
                      css={`
                        padding: 0;
                      `}
                    >
                      <label>End Date</label>
                    </th>
                  </tr>
                </thead>
                <tbody
                  mode={hoverListMode}
                  css={`
                    ${scrollFade};
                  `}
                >
                  {dates.map(date => (
                    <tr key={date.id}>
                      <DateText>{date.startdate || date.start}</DateText>
                      <DateText>{date.enddate || date.end}</DateText>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                css={`
                  color: ${colors[hoverListMode].text};
                  text-align: center;
                `}
              >
                none found
              </div>
            )}
          </CustomListBox>
        </Popover>
      </ListboxInput>
    </>
  )
}

DateList.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  isStat: PropTypes.bool,
  isCustomSpacing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  cardMode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startdate: PropTypes.string,
      enddate: PropTypes.string,
    }).isRequired
  ),
}

export default DateList
