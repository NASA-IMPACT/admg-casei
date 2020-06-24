import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Image from "../image"
import theme from "../../utils/theme"

const Section = styled.section`
  position: relative;
  border-top: 55px solid transparent;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;

  /* In case you _really_ need a border, use :before:
   * &:before {
   *   content: "";
   *   position: absolute;
   *   top: -2px;
   *   left: 0;
   *   right: 0;
   *   border-top: 2px solid #ccc;
   * }
  */
`

const SectionWithImage = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "image header" "image header" "image content"
    "image content";
  column-gap: 5rem;
`

export const SectionImage = ({ filename, alt }) => (
  <div style={{ gridArea: `image` }}>
    <Image filename={filename} alt={alt} />
  </div>
)

SectionImage.propTypes = {
  filename: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

const SectionBlock = ({
  tagline,
  headline,
  id,
  withImage,
  withBackground,
  children,
}) => {
  return (
    <Section
      as={withImage ? SectionWithImage : Section}
      id={id}
      data-cy={`${id}-section`}
    >
      {tagline && (
        <div style={{ textTransform: `uppercase`, alignSelf: `end` }}>
          {tagline}
        </div>
      )}
      <h2>{headline}</h2>
      {withBackground ? (
        <div
          style={{
            display: `flex`,
            alignItems: `stretch`,
            backgroundColor: theme.color.secondary,
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Section>
  )
}

SectionBlock.propTypes = {
  tagline: PropTypes.string,
  headline: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  withImage: PropTypes.bool,
  withBackground: PropTypes.bool,
  children: PropTypes.node,
}

export default SectionBlock
