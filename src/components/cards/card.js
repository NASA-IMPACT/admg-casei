import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  min-height: 180px;
`

const Card = ({
  children,
  image,
  cover,
  placeholder: Placeholder,
  tag,
  link,
  footerList,
  category,
  mode = NEGATIVE,
}) => (
  <div
    css={`
       {
        display: flex;
        flex-direction: column;
      }
    `}
  >
    <Link
      to={link}
      css={`
         {
          color: ${colors[mode].text};
          background-color: ${colors[mode].background};
          box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
            rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
          padding: 1rem;
          min-height: 20rem;
          flex-grow: 1;
          :hover {
            opacity: 0.64;
          }
        }
      `}
      data-cy={`${category}-card`}
    >
      <CardHeader>
        {image && image.gatsbyImg ? (
          <GatsbyImage
            image={image.gatsbyImg.childImageSharp.gatsbyImageData}
            alt={image.description}
            css={`
               {
                grid-area: 1 / 1;
                height: ${image.gatsbyImg.childImageSharp.gatsbyImageData
                  .height}px;
                margin: ${cover ? `-1rem -1rem 0 -1rem` : 0};
              }
            `}
            objectFit={cover ? "cover" : "contain"}
            objectPosition={cover ? "center center" : "left top"}
          />
        ) : (
          <div
            css={`
               {
                grid-area: 1 / 1;
              }
            `}
          >
            <Placeholder size="large" color={colors[mode].text} />
          </div>
        )}
        {tag && (
          <div
            css={`
               {
                grid-area: 1 / 1;
                align-self: flex-end;
                justify-self: flex-end;
                text-transform: uppercase;
                border: 1px solid;
                padding: 0.25rem;
                background-color: ${colors[mode].background};
                z-index: 1;
              }
            `}
            data-cy={`${tag.toLowerCase()}-tag`}
          >
            {tag}
          </div>
        )}
      </CardHeader>
      {children}
    </Link>
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
  cover: PropTypes.bool,
  placeholder: PropTypes.func.isRequired,
  height: PropTypes.string,
  link: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  footerList: PropTypes.object,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}

Card.defaultProps = {
  height: "100%",
}

export default Card
