import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

import { NEGATIVE, POSITIVE } from "../utils/constants"
import { colors, layout } from "../theme"
import DateList from "./date-list-hover"
import { ArrowIcon } from "../icons"
import { TypeAhead } from "../components/typeahead-box"
import { typeAhead } from "../utils/filter-utils"

export const HeroStats = ({ statList }) => (
  <dl
    css={`
      display: grid;
    `}
    data-cy="stats"
  >
    {statList.map(stat => (
      <React.Fragment key={stat.label}>
        <dt
          css={`
            font-size: 4rem;
          `}
        >
          {!stat.number && stat.number !== 0 ? "--" : stat.number}
        </dt>
        <dd
          css={`
            grid-row-start: 2;
            text-transform: uppercase;
          `}
        >
          {stat.dates ? (
            <DateList
              shortname="datelist"
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
  backlink,
  tagline,
  title,
  description,
  stats,
  cta,
  image,
  textToImageRatio = [3, 5],
  id,
}) {
  const ratioInPercent =
    (100 / (textToImageRatio[0] + textToImageRatio[1])) * textToImageRatio[0]
  // logic to support conditional display of TypeAhead searchbox component on only the home page(s)
  const displayTypeAhead = !(
    backlink?.includes("instrument") || backlink?.includes("platform")
  )
    ? true
    : false

  const images = useStaticQuery(graphql`
    {
      home: file(relativePath: { eq: "main_ice_bridge.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 1600)
        }
      }
    }
  `)
  const backgroundImage = images
    ? images["home"].childImageSharp.gatsbyImageData
    : null
  const homeImageAlt =
    "NASA's DC-8 flying laboratory passes Antarctica's tallest peak, Mount Vinson, on Oct. 22, 2012, during a flight over the continent to measure changes in the massive ice sheet and sea ice. Credit: NASA/Michael Studinger (Photography courtesy NASA Images)"

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
          {backlink && (
            <Link
              to={backlink}
              css={`
                 {
                  color: ${colors[NEGATIVE].linkText};
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  margin-top: 3rem;
                  margin-bottom: 6rem;
                }
              `}
              data-cy="back-link"
            >
              <ArrowIcon color={colors[NEGATIVE].linkText} direction="left" />
              Back to Explore
            </Link>
          )}
          {tagline && (
            <p
              css={`
                text-transform: uppercase;
              `}
            >
              {tagline}
            </p>
          )}

          <h1>{title}</h1>
        </div>

        <div
          css={`
            grid-area: extras;
            display: flex;
            flex-direction: column;
            gap: 3rem;
          `}
        >
          {description && <p>{description}</p>}

          {stats && <HeroStats statList={stats} />}

          {cta && (
            <div
              css={`
                height: 3rem;
                /* to match h1 default margin-top */
                margin-bottom: 1.5rem;
              `}
            >
              <Link
                to="/explore/campaigns"
                css={`
                  color: ${colors[POSITIVE].text} !important;
                  background-color: ${colors[POSITIVE].background};
                  font-weight: bold;
                  padding: 1rem 5rem;
                `}
                data-cy="cta-link"
              >
                {cta}
              </Link>
            </div>
          )}

          {displayTypeAhead && <TypeAhead onSearch={typeAhead} />}
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
            min-height: 100%;
            max-height: 60vh;
            overflow: hidden;
          `}
        >
          <div
            css={`
              height: 100%;
            `}
          >
            <StaticImage
              src="../images/main_ice_bridge.png"
              alt={homeImageAlt}
              placeholder="blurred"
              objectPosition="top"
              layout="fullWidth"
              objectFit="cover"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      )}
    </Container>
  )
}

Hero.propTypes = {
  backlink: PropTypes.string,
  tagline: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  description: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({ number: PropTypes.number, label: PropTypes.string })
  ),
  cta: PropTypes.node,
  textToImageRatio: PropTypes.arrayOf(PropTypes.number),
  image: PropTypes.node,
  id: PropTypes.string,
}
