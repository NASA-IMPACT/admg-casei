import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Image from "gatsby-image"
import { Link } from "gatsby"
import DateList from "../../components/date-list-hover"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../utils/theme"

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 2rem 0;
  min-height: 2rem;
`

const Card = ({
  children,
  image,
  link,
  placeholder: Placeholder,
  tag,
  footerList,
  category,
  mode = NEGATIVE,
}) => (
  <div>
    <Link to={link}>
      <div
        css={`
           {
            color: ${colors[mode].text};
            background-color: ${colors[mode].background};
            box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
              rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 24rem;
            :hover {
              opacity: 0.64;
            }
          }
        `}
        data-cy={`${category}-card`}
      >
        <div
          css={`
             {
              margin-bottom: 2rem;
            }
          `}
        >
          <CardHeader>
            {image && image.logoImg ? (
              <Image
                alt={image.logoAlt}
                fixed={image.logoImg.childImageSharp.fixed}
                css={`
                   {
                    margin: 0;
                  }
                `}
              />
            ) : (
              <Placeholder size="small" color={colors[mode].text} />
            )}
            {tag && (
              <div
                css={`
                   {
                    text-transform: uppercase;
                    border: 1px solid;
                    padding: 0.25rem;
                  }
                `}
                data-cy={`${tag.toLowerCase()}-tag`}
              >
                {tag}
              </div>
            )}
          </CardHeader>
          {children}
        </div>
      </div>
    </Link>
    {footerList && (
      <div
        css={`
          color: ${colors[mode].text};
          background-color: ${colors[mode].background};
          box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
            rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
          padding: 1rem;
          display: flex;
          min-height: 6rem;
          flex-wrap: wrap;
          align-items: center;
        `}
      >
        {Object.entries(footerList).map(([id, footeritem], index) => (
          <footeritem.component
            key={index}
            id={id}
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
    logoAlt: PropTypes.string,
    logoImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }),
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
