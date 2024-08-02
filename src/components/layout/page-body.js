import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { layout, breakpoints } from "../../theme"

const PageBodyStyles = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${layout.smallPageMargin};
  @media screen and (min-width: ${breakpoints["sm"]}) {
    padding: 0 ${layout.pageMargin};
  }
`
export default function PageBody({ children, id }) {
  return <PageBodyStyles data-cy={`main-${id}`}>{children}</PageBodyStyles>
}

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}
