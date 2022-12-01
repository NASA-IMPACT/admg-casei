import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { reformatDate } from "../../utils/helpers"
import { BackButton } from "./event-detail"

export const MainHeader = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 12px;
`

export const SubHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
`

export const SectionContent = styled.div`
  margin-bottom: 12px;
`

export const IopDetail = ({ iop, setSelectedEvent }) => {
  if (!iop) {
    return <div>No IOP data available</div>
  }
  return (
    <div
      css={`
        padding: 12px;
      `}
    >
      <BackButton setSelectedEvent={setSelectedEvent} />
      <MainHeader>Intensive Operation Period (IOP)</MainHeader>
      <SectionContent>{iop.short_name}</SectionContent>
      <SubHeader>Period</SubHeader>
      <SectionContent>{`${reformatDate(iop.start_date)} - ${reformatDate(
        iop.end_date
      )}`}</SectionContent>
      <SubHeader>Description</SubHeader>
      <SectionContent>{`${iop.description}`}</SectionContent>
    </div>
  )
}

IopDetail.propTypes = {
  iop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    short_name: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }),
  setSelectedEvent: PropTypes.func.isRequired,
}
