import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxOption,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styled from "styled-components"
import startOfToday from "date-fns/startOfToday"
import endOfToday from "date-fns/endOfToday"
import subWeeks from "date-fns/subWeeks"
import subMonths from "date-fns/subMonths"
import subYears from "date-fns/subYears"

import theme from "../../utils/theme"

const FilterButton = styled(ListboxButton)`
  flex-grow: 0;
  height: 2.5rem;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid ${theme.color.base};
  color: ${theme.color.base};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
`

const DateMenu = ({ id, style, label, dateRange, setDateRange }) => {
  const [startDate, setStartDate] = useState(dateRange.start)
  const [endDate, setEndDate] = useState(dateRange.end)

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
    <div style={style}>
      <VisuallyHidden id={`${id}-filter-select`}>
        select time range to filter by
      </VisuallyHidden>
      <ListboxInput
        name="date-filter"
        aria-labelledby={`${id}-filter-select`}
        data-cy={`${id}-filter-select`}
        onChange={() => setDateRange({ start: startDate, end: endDate })}
      >
        {({ isExpanded }) => (
          <>
            <FilterButton arrow="▼">{label}</FilterButton>
            {isExpanded && (
              <ListboxPopover
                style={{
                  background: theme.color.primary,
                  maxHeight: `24rem`,
                  display: `grid`,
                  gridTemplateColumns: `1fr 1fr`,
                }}
              >
                {/* TODO: Calendar styles */}
                <DatePicker
                  inline
                  showYearDropdown
                  onChange={date => setStartDate(date)}
                  selectsStart
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  shouldCloseOnSelect={false}
                />
                <DatePicker
                  inline
                  showYearDropdown
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  selected={endDate}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  shouldCloseOnSelect={false}
                />
                <div>
                  {/* TODO: Button styles */}
                  <button onClick={() => onButtonClick("week")}>
                    Week ago
                  </button>
                  <button onClick={() => onButtonClick("month")}>
                    Month ago
                  </button>
                  <button onClick={() => onButtonClick("halfYear")}>
                    6 Months ago
                  </button>
                  <button onClick={() => onButtonClick("tenYears")}>
                    10 years ago
                  </button>
                </div>
                <ListboxOption value="selection">Apply</ListboxOption>
              </ListboxPopover>
            )}
          </>
        )}
      </ListboxInput>
    </div>
  )
}

DateMenu.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  label: PropTypes.string.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
}

export default DateMenu
