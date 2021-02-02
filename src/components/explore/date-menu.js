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

import theme from "../../utils/theme"
import { ButtonText, Label } from "../../theme/typography"

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

const TimeRangeButton = styled.button`
  flex-grow: 0;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  color: ${theme.color.base};
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
  border: 1px solid ${theme.color.base};
  color: ${theme.color.base};
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
`

const DateMenu = ({ id, style, label, dateRange, setDateRange }) => {
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
        <FilterButton arrow="▼">
          <ButtonText>{label}</ButtonText>
        </FilterButton>
        <ListboxPopover
          style={{
            background: theme.color.primary,
            minWidth: `fit-content`,
          }}
        >
          <ListboxList
            style={{
              display: `flex`,
              margin: `1rem`,
              alignItems: `center`,
              justifyContent: `space-between`,
            }}
          >
            <Label>From:</Label>
            <DatePicker
              showYearDropdown
              onChange={date => setStartDate(date)}
              selected={startDate}
            />
            <Label>To:</Label>
            <DatePicker
              showYearDropdown
              onChange={date => setEndDate(date)}
              selected={endDate}
              minDate={startDate}
            />
          </ListboxList>
          <ListboxList
            style={{
              display: `flex`,
              gap: `1rem`,
              margin: `1rem`,
              alignItems: `center`,
            }}
          >
            <TimeRangeButton onClick={() => onButtonClick("month")}>
              <ButtonText>1 Month ago</ButtonText>
            </TimeRangeButton>
            <TimeRangeButton onClick={() => onButtonClick("halfYear")}>
              <ButtonText>6 Months ago</ButtonText>
            </TimeRangeButton>
            <TimeRangeButton onClick={() => onButtonClick("tenYears")}>
              <ButtonText>10 years ago</ButtonText>
            </TimeRangeButton>

            <ApplyButton value="select">
              <ButtonText>Apply</ButtonText>
            </ApplyButton>
          </ListboxList>
        </ListboxPopover>
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
