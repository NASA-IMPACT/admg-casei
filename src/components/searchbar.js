import React from "react"
import { Button } from "@devseed-ui/button"

const Searchbar = () => (
  <div className="search-container">
    <form style={{ margin: 0, display: `flex` }}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          boxShadow: `0 -1px 1px 0 rgba(68,63,63,0.08), 0 2px 6px 0 rgba(68,63,63,0.08)`,
          borderRadius: `0.25rem`,
        }}
      />
      <Button
        variation="base-raised-light"
        size="medium"
        title="search"
        type="submit"
      >
        <span role="img" aria-label="magnifying-glass-emoji">
          🔍
        </span>
      </Button>
    </form>
  </div>
)

export default Searchbar
