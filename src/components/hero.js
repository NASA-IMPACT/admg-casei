import React from "react"
import PropTypes from "prop-types"

import HeroStats from "./hero-stats"
import theme from "../utils/theme"

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
        backgroundImage: `linear-gradient(90deg, rgba(12,21,32, 0.8) 0%, rgba(12,21,32, 0.7)${
          ratioInPercent - 20
        }%, rgba(12,21,32, 0.0)${
          ratioInPercent + 20
        }%), url("${backgroundImage}")`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
      }
    : null
  return (
    <section
      style={{
        ...imageStyle,
        display: `grid`,
        gridTemplateColumns: `${textToImageRatio[0]}fr ${textToImageRatio[1]}fr`,
        columnGap: `2rem`,
        minHeight: `35rem`,
        alignContent: `center`,
        padding: `0 ${theme.layout.pageMargin}`,
      }}
      data-cy={`${id}-hero`}
    >
      <div style={{ alignSelf: `end` }}>
        <p style={{ textTransform: `uppercase` }}>{tagTitle}</p>
        <h1 style={{ marginBottom: `0` }}>{title}</h1>
        {subTitle && <p style={{ fontSize: `x-large` }}>{subTitle}</p>}
      </div>

      {description && (
        <div style={{ alignSelf: `start` }}>
          <p>{description}</p>
        </div>
      )}

      <div style={{ gridArea: `1 / 2 / 3 / 3` }}>{children}</div>
      {stats && <HeroStats statList={stats} />}
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
  backgroundImage: PropTypes.string,
  id: PropTypes.string,
}
