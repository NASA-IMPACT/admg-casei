import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Image from "../image"
import theme from "../../utils/theme"

const Section = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "header" "content";
  margin-top: 5rem;

  /* This invisible border pushes the section below the nav bar when using inpage navigation */
  border-top: 55px solid transparent;
  position: relative;
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
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "image header" "image content" "image content";
  column-gap: 5rem;
`

const SectionWithText = styled(Section)`
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas: "header header header header header header header . . . . ." ". . . . . content content content content content content content";
  column-gap: 1rem;
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
  withText,
  children,
}) => {
  return (
    <Section
      as={withImage ? SectionWithImage : withText ? SectionWithText : Section}
      id={id}
      data-cy={`${id}-section`}
    >
      <div style={{ gridArea: `header`, alignSelf: `end` }}>
        {tagline && (
          <div style={{ textTransform: `uppercase` }} data-cy="section-tagline">
            {tagline}
          </div>
        )}
        <h2>{headline}</h2>
      </div>
      {withImage ? (
        children
      ) : (
        <div
          style={{
            backgroundColor: withBackground ? theme.color.secondary : `inherit`,
            gridArea: `content`,
          }}
        >
          {children}
        </div>
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
  withText: PropTypes.bool,
  children: PropTypes.node,
}

export default SectionBlock
