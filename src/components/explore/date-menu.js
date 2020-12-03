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

const DateMenu = ({ id, style, label }) => {
  // TODO: apply these dates as filter!
  const [startDate, setStartDate] = useState(new Date("2014/02/08"))
  const [endDate, setEndDate] = useState(new Date("2014/02/10"))

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
        <FilterButton arrow="▼">{label}</FilterButton>
        <ListboxPopover
          style={{
            background: theme.color.primary,
            maxHeight: `24rem`,
            display: `flex`, // TODO: only flex if open, otherwise none
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
          />
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

DateMenu.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    })
  ).isRequired,
}

export default DateMenu
