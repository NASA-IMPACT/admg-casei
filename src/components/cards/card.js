import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Image from "gatsby-image"

import { colors } from "../../utils/theme"

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 2rem 0;
  min-height: 2rem;
  & div:only-child {
    margin-left: auto;
  }
`

const Card = ({
  children,
  image,
  placeholder: Placeholder,
  height,
  tag,
  footerList,
  category,
}) => (
  <div
    style={{
      backgroundColor: colors.darkTheme.background,
      boxShadow: `rgba(68, 63, 63, 0.08) 0px -1px 1px 0px, rgba(68, 63, 63, 0.08) 0px 2px 6px 0px`,
      padding: `1rem`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      height: height,
    }}
    data-cy={`${category}-card`}
  >
    <div style={{ marginBottom: `2rem` }}>
      <CardHeader>
        {image && image.logoImg ? (
          <Image
            alt={image.logoAlt}
            fixed={image.logoImg.childImageSharp.fixed}
            style={{ margin: `0` }}
          />
        ) : (
          <Placeholder size="small" />
        )}
        {tag && (
          <div
            style={{
              textTransform: `uppercase`,
              border: `1px solid`,
              padding: `0.25rem`,
            }}
            data-cy={`${tag.toLowerCase()}-tag`}
          >
            {tag}
          </div>
        )}
      </CardHeader>
      {children}
    </div>
    {footerList && (
      <div>
        {footerList.map((o, index) => (
          <small
            key={o.title}
            style={{ whiteSpace: `nowrap` }}
            data-cy={`count${index + 1}`}
          >
            {index !== 0 && ` · `}
            <strong>{o.count}</strong> {o.title}
            {o.count !== 1 && "s"}
          </small>
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
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  footerList: PropTypes.arrayOf(
    PropTypes.shape({ count: PropTypes.number, title: PropTypes.string })
  ),
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

Card.defaultProps = {
  height: "100%",
}

export default Card
