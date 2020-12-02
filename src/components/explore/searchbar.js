import React from "react"
import { CloseIcon, SearchIcon } from "../icons"
import theme from "../../utils/theme"

const Searchbar = React.forwardRef((_props, ref) => (
  <div
    style={{
      display: "flex",
      flexGrow: 1,
      border: `1px solid ${theme.color.base}`,
      borderLeft: 0,
      borderRight: 0,
      borderRadius: `0`,
      padding: "0.25rem",
    }}
  >
    <input
      autoComplete="off"
      data-cy="explore-input"
      aria-label="Search for campaigns, platforms or instruments"
      name="search"
      placeholder="Search for campaigns, platforms or instruments"
      style={{
        border: "none",
        flexGrow: 1,
        background: `transparent`,
        color: theme.color.base,
      }}
      type="text"
      ref={ref}
    />
    {ref.current?.value ? (
      <button
        type="reset"
        style={{
          border: "none",
          flexGrow: 0,
          background: `transparent`,
          color: theme.color.base,
          verticalAlign: `middle`,
        }}
        data-cy="reset"
      >
        <span role="img" aria-label="X icon">
          <CloseIcon color={theme.color.base} />
        </span>
      </button>
    ) : (
      <button
        type="submit"
        style={{
          border: "none",
          flexGrow: 0,
          background: `transparent`,
          color: theme.color.base,
          verticalAlign: `middle`,
        }}
        data-cy="submit"
      >
        <span role="img" aria-label="Magnifying glass icon">
          <SearchIcon color={theme.color.base} />
        </span>
      </button>
    )}
  </div>
))

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Searchbar.displayName = "Searchbar"

export default Searchbar
