import React, { useState } from "react"
import PropTypes from "prop-types"
import { ListboxInput, ListboxButton, ListboxPopover } from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styled from "styled-components"

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

  const onApply = () => {
    setDateRange({ start: startDate, end: endDate })
    // TODO: close popover
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
                <DatePicker
                  inline
                  showYearDropdown
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  shouldCloseOnSelect={false}
                />
                <DatePicker
                  inline
                  showYearDropdown
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  shouldCloseOnSelect={false}
                />
                <div>
                  {/* TODO: Set internal state (setStartDate, setEndDate) to these ranges */}
                  <button>Week ago</button>
                  <button>Month ago</button>
                  <button>6 Months ago</button>
                </div>
                {/* TODO: Button styles */}
                <button onClick={onApply}>Apply</button>
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
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
}

export default DateMenu
