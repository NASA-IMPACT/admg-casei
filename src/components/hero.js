import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

import { layout } from "../theme"
import DateList from "./date-list-hover"

export const HeroStats = ({ statList }) => (
  <dl style={{ display: `grid` }} data-cy="stats">
    {statList.map(stat => (
      <React.Fragment key={stat.label}>
        <dt style={{ fontSize: `4rem` }}>
          {!stat.number && stat.number !== 0 ? "--" : stat.number}
        </dt>
        <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>
          {stat.dates ? (
            <DateList
              id={stat.label}
              title={stat.label}
              dates={stat.dates}
              isStat
              isCustomSpacing
            />
          ) : (
            stat.label
          )}
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
      dates: PropTypes.array,
    })
  ).isRequired,
}

export default function Hero({
  tagTitle,
  title,
  blockTitle,
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
        gridTemplateColumns: `1fr minmax(auto,  ${layout.maxWidth}) 1fr`,
        width: `100vw`,
        minHeight: `35rem`,
        alignContent: `center`,
        marginBottom: `6rem`,
      }}
      data-cy={`${id}-hero`}
    >
      <div
        css={`
          grid-area: 1 / 2 / 1 / 2;
          display: grid;
          grid-template-columns: ${textToImageRatio[0]}fr ${textToImageRatio[1]}fr;
          grid-gap: 0.5rem;
          padding: 0 ${layout.pageMargin};
        `}
      >
        <div
          css={`
            align-self: end;
            grid-area: 1 / 1 / 1 / 1;
          `}
        >
          <p
            css={`
              text-transform: uppercase;
            `}
          >
            {tagTitle}
          </p>
          <h1>{title}</h1>
          {blockTitle && <h2>{blockTitle}</h2>}
          {subTitle && <p>{subTitle}</p>}
        </div>

        <div
          css={`
            align-self: start;
            grid-area: 2 / 1 / 2 / 1;
          `}
        >
          {description && <p>{description}</p>}
        </div>

        {children && (
          <div
            css={`
              grid-area: 1 / 2 / 3 / 3;
            `}
          >
            {children}
          </div>
        )}

        {stats && (
          <div
            css={`
              grid-area: 2 / 1 / 2 / 1;
            `}
          >
            <HeroStats statList={stats} />
          </div>
        )}
      </div>

      {backgroundImage && (
        <div
          css={`
            grid-row: 1 / span 1;
            grid-column: 1 / span 3;
            z-index: -1;
          `}
        >
          <GatsbyImage
            image={backgroundImage.nasaImg.childImageSharp.gatsbyImageData}
            alt={backgroundImage.nasaImgAlt}
            // TODO: does not take effect
            objectPosition={"center top"}
            css={`
              max-height: 35rem;
              min-width: 55rem;
              object-position: center top; /* TODO: does not take effect */
            `}
          />
        </div>
      )}
    </section>
  )
}

Hero.propTypes = {
  tagTitle: PropTypes.string,
  title: PropTypes.string,
  blockTitle: PropTypes.string,
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
