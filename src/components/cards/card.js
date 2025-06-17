import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const CardHeader = styled.div`
  display: flex;
  align-items: ${({ imagePosition }) =>
    imagePosition === "left top" ? "flex-start" : "center"};
  justify-items: ${({ imagePosition }) =>
    imagePosition === "left top" ? "flex-start" : "center"};
  flex-direction: column;
  min-height: 180px;
  margin-bottom: 0.5rem;
`

const CardLink = styled(Link)`
  color: ${({ mode }) => colors[mode].text};
  background-color: ${({ mode }) => colors[mode].background};
  box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
    rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
  padding: 1rem;
  min-height: 20rem;
  flex-grow: 1;
  transition: all 0.24s ease-out;
  &:hover {
    background-color: ${({ mode }) => colors[mode].altBackground};
    opacity: 1;
  }
`

const Card = ({
  children,
  image,
  placeholder: Placeholder,
  imagePosition,
  tag,
  link,
  footerList,
  category,
  mode = POSITIVE,
}) => (
  <div
    css={`
       {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `}
  >
    <CardLink to={link} mode={mode} data-cy={`${category}-card`}>
      <CardHeader imagePosition={image?.gatsbyImg ? imagePosition : "left top"}>
        {image?.gatsbyImg ? (
          <GatsbyImage
            image={getImage(image.gatsbyImg)}
            alt={image.description}
          />
        ) : (
          <div>
            <Placeholder size="medium" color={colors[mode].text} />
          </div>
        )}
      </CardHeader>
      {children}
      {tag && (
        <div
          css={`
             {
              display: inline-block;
              text-transform: uppercase;
              border: 1px solid;
              padding: 0.125rem 0.5rem;
              margin-top: 1rem;
              border-radius: 0.25rem;
              font-size: 0.675rem;
              letter-spacing: 0.5px;
            }
          `}
          data-cy={`${tag.toLowerCase()}-tag`}
        >
          {tag}
        </div>
      )}
    </CardLink>
    {footerList && (
      <div
        css={`
          color: ${colors[mode].text};
          background-color: ${colors[mode].background};
          box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
            rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
          padding: 1rem 0.5rem;
          justify-content: center;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        `}
        data-cy={`${category}-card-footer`}
      >
        {Object.entries(footerList).map(([shortname, footeritem], index) => (
          <footeritem.component
            key={index}
            shortname={shortname}
            index={index}
            {...footeritem.props}
          />
        ))}
      </div>
    )}
  </div>
)

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  image: PropTypes.shape({
    description: PropTypes.string,
    gatsbyImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }),
  placeholder: PropTypes.func.isRequired,
  imagePosition: PropTypes.oneOf(["left top"]),
  link: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  footerList: PropTypes.object,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}

export default Card
