import React, { useState } from "react"
import PropTypes from "prop-types"
import { CloseIcon, SearchIcon } from "../../icons"
import { colors } from "../../utils/theme"

const Searchbar = React.forwardRef(({ toggleMap, isDisplayingMap }, ref) => {
  const [inputsize, setInputsize] = useState(50)

  return (
    <div
      css={`
        flex-grow: 1;
        display: flex;
        height: 2.5rem;
        align-content: stretch;
      `}
    >
      <div
        css={`
          border: 1px solid ${colors.darkTheme.text};
          padding: 0.25rem;
          flex-grow: 1;
        `}
      >
        <button
          type="submit"
          css={`
            border: none;
            flex-grow: 0;
            background: transparent;
            color: ${colors.darkTheme.text};
            vertical-align: middle;
          `}
          data-cy="submit"
        >
          <span role="img" aria-label="Magnifying glass icon">
            <SearchIcon color={colors.darkTheme.text} />
          </span>
        </button>
        <input
          autoComplete="off"
          data-cy="explore-input"
          aria-label="Search for campaigns, platforms or instruments"
          name="search"
          placeholder="Search for campaigns, platforms or instruments"
          onChange={e => setInputsize(Math.min(e.target.value.length, 140))}
          size={inputsize}
          css={`
            border: none;
            background: transparent;
            color: ${colors.darkTheme.text};
            font-style: italic;
          `}
          type="text"
          ref={ref}
        />
        {ref.current?.value && (
          <button
            type="reset"
            onClick={() => setInputsize(50)}
            css={`
              border: none;
              flex-grow: 0;
              background: transparent;
              color: ${colors.darkTheme.text};
              vertical-align: middle;
            `}
            data-cy="reset"
          >
            <span role="img" aria-label="X icon">
              <CloseIcon color={colors.darkTheme.text} />
            </span>
          </button>
        )}
      </div>
      <div
        css={`
          border: 1px solid ${colors.darkTheme.text};
          padding: 0.25rem;
        `}
      >
        <button
          css={`
            border: none;
            flex-grow: 0;
            background: transparent;
            color: ${colors.darkTheme.text};
            vertical-align: middle;
            cursor: pointer;
          `}
          data-cy="map-toggle-btn"
          onClick={() => toggleMap(!isDisplayingMap)}
        >
          <span>{isDisplayingMap ? "Hide" : "Show"} Map</span>
        </button>
      </div>
    </div>
  )
})

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Searchbar.displayName = "Searchbar"

Searchbar.propTypes = {
  toggleMap: PropTypes.func.isRequired,
  isDisplayingMap: PropTypes.func.isRequired,
}

export default Searchbar
