import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { CampaignIcon } from "../../icons"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export default function PopupCard({ shortname, longname, logo, mode }) {
  return (
    <Link to={`/campaign/${shortname}`} data-cy="popup-card">
      <div
        css={`
           {
            color: ${colors[mode].text};
            :hover {
              opacity: 0.64;
              cursor: pointer;
            }
          }
        `}
      >
        {logo?.gatsbyImg ? (
          <GatsbyImage
            image={getImage(logo.gatsbyImg)}
            alt={logo.description}
            objectFit="scale-down"
            objectPosition="left top"
          />
        ) : (
          <div>
            <CampaignIcon size="small" color={colors[mode].text} />
          </div>
        )}
        <p>
          <big
            css={`
              font-weight: bold;
              margin-top: 0.5rem;
            `}
            data-cy="shortname"
          >
            {shortname}
          </big>
        </p>
        <p data-cy="longname">{longname}</p>
      </div>
    </Link>
  )
}

PopupCard.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.longname,
  logo: PropTypes.object,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}
