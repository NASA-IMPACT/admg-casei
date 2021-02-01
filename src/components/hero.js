import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"

import { Heading1, SmallTitles, BodyText } from "../theme/typography"
import theme from "../utils/theme"

export const HeroStats = ({ statList }) => (
  <dl style={{ display: `grid`, maxHeight: `6rem` }} data-cy="stats">
    {statList.map(stat => (
      <React.Fragment key={stat.label}>
        <dt style={{ fontSize: `3rem` }}>
          {!stat.number && stat.number !== 0 ? "--" : stat.number}
        </dt>
        <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>
          {stat.label}
        </dd>
      </React.Fragment>
    ))}
  </dl>
)

HeroStats.propTypes = {
  statList: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default function Hero({
  tagTitle,
  title,
  subTitle,
  description,
  stats,
  children,
  textToImageRatio = [3, 5],
  backgroundImage,
  id,
}) {
  const ratioInPercent =
    (100 / (textToImageRatio[0] + textToImageRatio[1])) * textToImageRatio[0]
  const imageStyle = backgroundImage
    ? {
        background: `linear-gradient(90deg, rgba(12,21,32, 0.8) 0%, rgba(12,21,32, 0.7)${
          ratioInPercent - 20
        }%, rgba(12,21,32, 0.0)${ratioInPercent + 20}%)`,
      }
    : null
  return (
    <section
      style={{
        ...imageStyle,
        display: `grid`,
        gridTemplateColumns: `1fr minmax(auto,  ${theme.layout.maxWidth}) 1fr`,
        width: `100vw`,
        minHeight: `35rem`,
        alignContent: `center`,
      }}
      data-cy={`${id}-hero`}
    >
      <div
        style={{
          gridArea: `1 / 2 / 1 / 2`,
          display: `grid`,
          gridTemplateColumns: `${textToImageRatio[0]}fr ${textToImageRatio[1]}fr`,
          gridGap: `.5rem`,
          padding: `0 ${theme.layout.pageMargin}`,
        }}
      >
        <div style={{ alignSelf: `end`, gridArea: `1 / 1 / 1 / 1` }}>
          <SmallTitles style={{ textTransform: `uppercase` }}>
            {tagTitle}
          </SmallTitles>
          <Heading1>{title}</Heading1>
          {subTitle && <BodyText>{subTitle}</BodyText>}
        </div>

        <div style={{ alignSelf: `start`, gridArea: `2 / 1 / 2 / 1` }}>
          {description && <BodyText>{description}</BodyText>}
        </div>

        {children && (
          <div style={{ gridArea: `1 / 2 / 3 / 3` }}>{children}</div>
        )}

        {stats && (
          <div style={{ gridArea: `2 / 1 / 2 / 1` }}>
            <HeroStats statList={stats} />
          </div>
        )}
      </div>

      {backgroundImage && (
        <div
          style={{
            gridRow: `1 / span 1`,
            gridColumn: `1 / span 3`,
            zIndex: -1,
          }}
        >
          <Image
            alt={backgroundImage.nasaImgAlt}
            fluid={backgroundImage.nasaImg.childImageSharp.fluid}
            style={{
              maxHeight: `35rem`,
            }}
          />
        </div>
      )}
    </section>
  )
}

Hero.propTypes = {
  tagTitle: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({ number: PropTypes.number, label: PropTypes.string })
  ),
  children: PropTypes.node,
  textToImageRatio: PropTypes.arrayOf(PropTypes.number),
  backgroundImage: PropTypes.shape({
    nasaImgAlt: PropTypes.string.isRequired,
    nasaImg: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }),
  id: PropTypes.string,
}
