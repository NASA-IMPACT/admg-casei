import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styled from "styled-components"
import {
  startOfToday,
  endOfToday,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { breakpoints } from "../../theme/style-helpers"

const FilterButton = styled(ListboxButton)`
  flex-grow: 0;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid ${colors[NEGATIVE].text};
  color: ${colors[NEGATIVE].text};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  @media screen and (max-width: ${breakpoints["lg"]}) {
    height: 2.5rem;
  }
  @media screen and (max-width: ${breakpoints["md"]}) {
    height: 4.5rem;
  }
  @media screen and (max-width: ${breakpoints["sm"]}) {
    height: 2.5rem;
  }
`

const TimeRangeButton = styled.button`
  flex-grow: 0;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  color: ${colors[NEGATIVE].text};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: capitalize;
`

const ApplyButton = styled(ListboxOption)`
  flex-grow: 0;
  height: 2.5rem;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid ${colors[NEGATIVE].text};
  color: ${colors[NEGATIVE].text};
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
`

const DateMenu = ({ id, label, dateRange, setDateRange }) => {
  const [startDate, setStartDate] = useState(dateRange.start || new Date())
  const [endDate, setEndDate] = useState(dateRange.end || new Date())

  const onButtonClick = value => {
    switch (value) {
      case "week": {
        const lastWeek = subWeeks(startOfToday(), 1)

        setStartDate(lastWeek)
        setEndDate(endOfToday())
        break
      }

      case "month": {
        const lastMonth = subMonths(startOfToday(), 1)

        setStartDate(lastMonth)
        setEndDate(endOfToday())
        break
      }

      case "halfYear": {
        const sixMonthsAgo = subMonths(startOfToday(), 6)

        setStartDate(sixMonthsAgo)
        setEndDate(endOfToday())
        break
      }

      case "tenYears": {
        const tenYearsAgo = subYears(startOfToday(), 10)

        setStartDate(tenYearsAgo)
        setEndDate(endOfToday())
        break
      }

      default:
        break
    }
  }

  return (
    <div
      css={`
        flex-grow: 1;
      `}
    >
      <VisuallyHidden id={`${id}-filter-select`}>
        select time range to filter by
      </VisuallyHidden>
      <ListboxInput
        name="date-filter"
        aria-labelledby={`${id}-filter-select`}
        data-cy={`${id}-filter-select`}
        onChange={() => setDateRange({ start: startDate, end: endDate })}
      >
        <FilterButton arrow="▼">{label}</FilterButton>
        <ListboxPopover
          css={`
            background: ${colors[NEGATIVE].altBackground};
            min-width: fit-content;
          `}
        >
          <ListboxList>
            <div
              css={`
                display: flex;
                margin: 1rem;
                align-items: center;
                justify-content: space-between;
              `}
            >
              From:
              <DatePicker
                showYearDropdown
                onChange={date => setStartDate(date)}
                selected={startDate}
              />
              To:
              <DatePicker
                showYearDropdown
                onChange={date => setEndDate(date)}
                selected={endDate}
                minDate={startDate}
              />
            </div>
            <div
              css={`
                display: flex;
                gap: 1rem;
                margin: 1rem;
                align-items: center;
              `}
            >
              <TimeRangeButton onClick={() => onButtonClick("month")}>
                1 Month ago
              </TimeRangeButton>
              <TimeRangeButton onClick={() => onButtonClick("halfYear")}>
                6 Months ago
              </TimeRangeButton>
              <TimeRangeButton onClick={() => onButtonClick("tenYears")}>
                10 years ago
              </TimeRangeButton>

              {/**
               * This button is the only actual listbox option
               * Its only job is to submit the selected date
               */}
              <ApplyButton value="select" tabIndex={0}>
                {/* tabIndex was required to allow keyboard focus. TODO: submit on enter ?!  */}
                Apply
              </ApplyButton>
            </div>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

DateMenu.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
}

export default DateMenu
