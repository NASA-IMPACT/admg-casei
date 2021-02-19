import React, { useState } from "react"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../utils/theme"

const Searchbar = React.forwardRef((_props, ref) => {
  const [inputsize, setInputsize] = useState(50)

  return (
    <div
      style={{
        display: "flex",
        height: `2.5rem`,
        flexGrow: 1,
        border: `1px solid ${colors[NEGATIVE].text}`,
        padding: "0.25rem",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <input
          autoComplete="off"
          data-cy="explore-input"
          aria-label="Search for campaigns, platforms or instruments"
          name="search"
          placeholder="Search for campaigns, platforms or instruments"
          onChange={e => setInputsize(Math.min(e.target.value.length, 140))}
          size={inputsize}
          style={{
            border: "none",
            background: `transparent`,
            color: colors[NEGATIVE].text,
          }}
          type="text"
          ref={ref}
        />
        {ref.current?.value && (
          <button
            type="reset"
            onClick={() => setInputsize(50)}
            style={{
              border: "none",
              flexGrow: 0,
              background: `transparent`,
              color: colors[NEGATIVE].text,
              verticalAlign: `middle`,
            }}
            data-cy="reset"
          >
            <span role="img" aria-label="X icon">
              <CloseIcon color={colors[NEGATIVE].text} />
            </span>
          </button>
        )}
      </div>
      <button
        type="submit"
        style={{
          border: "none",
          flexGrow: 0,
          background: `transparent`,
          color: colors[NEGATIVE].text,
          verticalAlign: `middle`,
        }}
        data-cy="submit"
      >
        <span role="img" aria-label="Magnifying glass icon">
          <SearchIcon color={colors[NEGATIVE].text} />
        </span>
      </button>
    </div>
  )
})

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Searchbar.displayName = "Searchbar"

export default Searchbar
