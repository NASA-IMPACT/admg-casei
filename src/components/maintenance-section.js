import React, { useContext } from "react"
import { Link } from "gatsby"

import { AuthContext } from "../components/auth-provider"
import { SectionBlock } from "./section"
import theme from "../utils/theme"

const MaintenanceSection = () => {
  const context = useContext(AuthContext)

  return (
    <SectionBlock id="maintenance">
      {context.isLoggedIn && (
        // TODO: this is temporary, build out edit functionality
        <Link
          to="/campaign/${id}/edit"
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

export default MaintenanceSection
