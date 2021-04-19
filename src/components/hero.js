import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import { POSITIVE } from "../utils/constants"
import { colors, layout } from "../theme"
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

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(auto, ${layout.maxWidth}) 1fr;
  width: 100vw;
  min-height: 35rem;
  align-content: center;
  margin-bottom: 6rem;
  background: ${({ backgroundImage, ratioInPercent }) =>
    backgroundImage
      ? `linear-gradient(90deg, rgba(12,21,32, 0.8) 0%, rgba(12,21,32, 0.7)${
          ratioInPercent - 20
        }%, rgba(12,21,32, 0.0)${ratioInPercent + 20}%)`
      : null};
`

export default function Hero({
  tagTitle,
  title,
  blockTitle,
  subTitle,
  description,
  stats,
  cta,
  image,
  textToImageRatio = [3, 5],
  backgroundImage,
  id,
}) {
  const ratioInPercent =
    (100 / (textToImageRatio[0] + textToImageRatio[1])) * textToImageRatio[0]

  return (
    <Container
      data-cy={`${id}-hero`}
      backgroundImage={backgroundImage}
      ratioInPercent={ratioInPercent}
    >
      <div
        css={`
          grid-area: 1 / 2 / 1 / 2;

          display: grid;
          grid-template-columns: ${textToImageRatio[0]}fr ${textToImageRatio[1]}fr;
          grid-template-areas:
            "title image"
            "extras image";
          grid-gap: 0.5rem;
          padding: 0 ${layout.pageMargin};
        `}
      >
        <div
          css={`
            align-self: end;
            grid-area: title;
          `}
        >
          {tagTitle && (
            <p
              css={`
                text-transform: uppercase;
              `}
            >
              {tagTitle}
            </p>
          )}
          <h1>{title}</h1>
          {blockTitle && <h2>{blockTitle}</h2>}
          {subTitle && <p>{subTitle}</p>}
        </div>

        <div
          css={`
            grid-area: extras;
          `}
        >
          {description && <p>{description}</p>}

          {stats && <HeroStats statList={stats} />}

          {cta && (
            <Link
              to="/explore"
              css={`
                color: ${colors[POSITIVE].text};
                background-color: ${colors[POSITIVE].background};
                font-weight: bold;
                padding: 1rem 5rem;
              `}
              data-cy="cta-link"
            >
              {cta}
            </Link>
          )}
        </div>

        {image && (
          <div
            css={`
              align-self: center;
              justify-self: end;
              grid-area: image;
            `}
          >
            {image}
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
            objectPosition={"center top"}
            css={`
              max-height: 70vh;
              min-width: 55rem;
            `}
          />
        </div>
      )}
    </Container>
  )
}

Hero.propTypes = {
  tagTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  blockTitle: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({ number: PropTypes.number, label: PropTypes.string })
  ),
  cta: PropTypes.node,
  textToImageRatio: PropTypes.arrayOf(PropTypes.number),
  image: PropTypes.node,
  backgroundImage: PropTypes.shape({
    nasaImgAlt: PropTypes.string.isRequired,
    nasaImg: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }),
  id: PropTypes.string,
}
