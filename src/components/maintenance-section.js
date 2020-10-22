import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { AuthContext } from "../components/auth-provider"
import { SectionBlock } from "./layout"
import theme from "../utils/theme"

const MaintenanceSection = ({ id, data }) => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <SectionBlock id="maintenance">
      {isLoggedIn && (
        // TODO: this is temporary, build out edit functionality
        <Link
          to={`/edit/campaign/${id}`}
          state={{ data }}
          style={{
            border: `1px solid ${theme.color.base}`,
            padding: `1rem 5rem`,
            textTransform: `uppercase`,
          }}
        >
          Edit
        </Link>
      )}
    </SectionBlock>
  )
}

MaintenanceSection.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
}

export default MaintenanceSection
