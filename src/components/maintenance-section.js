import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { AuthContext } from "../components/auth-provider"
import { Section } from "./layout"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const MaintenanceSection = ({ shortname, data }) => {
  const { isLoggedIn } = useContext(AuthContext)

  // TODO: this is temporary, build out edit functionality

  return (
    isLoggedIn && (
      <Section id="maintenance">
        <Link
          to={`/edit/campaign/${shortname}`}
          state={{ data }}
          css={`
            border: 1px solid ${colors[NEGATIVE].text};
            padding: 1rem 5rem;
            text-transform: uppercase;
          `}
        >
          Edit
        </Link>
      </Section>
    )
  )
}

MaintenanceSection.propTypes = {
  shortname: PropTypes.string.isRequired,
  data: PropTypes.object,
}

export default MaintenanceSection
