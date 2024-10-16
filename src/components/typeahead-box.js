import React, { useState } from "react"
import { typeAhead } from "../utils/filter-utils"
import { useStaticQuery, graphql } from "gatsby"
import { sortBy } from "lodash"
import { NEGATIVE, POSITIVE } from "../utils/constants"
import { colors } from "../theme"
import { ArrowIcon } from "../icons"
import { Link } from "gatsby"

export function TypeAhead() {
  const queryData = useStaticQuery(graphql`
    {
      allCampaign {
        nodes {
          long_name
          id
          short_name
        }
      }
      allPlatform {
        nodes {
          long_name
          short_name
          id
        }
      }
      allInstrument {
        nodes {
          short_name
          long_name
          id
        }
      }
    }
  `)

  const [value, setValue] = useState("")
  const [typeAheadDisplay, setTypeAheadDisplay] = useState([])

  const handleSearch = event => {
    // remove the typeahead dropdown when there is no current user input
    if (event.target.value === "") {
      setTypeAheadDisplay([])
      setValue("")
      // if there are results open the dropdown
    } else {
      // if there is user input, execute the search on the static queried data
      let caseiData = {
        Campaign: queryData.allCampaign.nodes.map(node => {
          return {
            parent: "Campaign",
            link: `/campaign/${node.short_name}`,
            ...node,
          }
        }),
        Platform: queryData.allPlatform.nodes.map(node => {
          return {
            parent: "Platform",
            link: `/platform/${node.short_name}`,
            ...node,
          }
        }),
        Instrument: queryData.allInstrument.nodes.map(node => {
          return {
            parent: "Instrument",
            link: `/instrument/${node.short_name}`,
            ...node,
          }
        }),
      }

      // typeahead utility function
      let results = typeAhead.searchData(event.target.value, caseiData)

      let searchResult = []
      const n = 5
      // push a slice of size N from each sub array in results into searchResult array
      for (const key in results) {
        searchResult = searchResult.concat(results[key].slice(0, n))
      }
      let sortedSearchResult = sortBy(searchResult, value => value.short_name)
      setTypeAheadDisplay(sortedSearchResult)
      setValue(event.target.value)
    }
  }
  return (
    <div
      css={`
        position: relative;
        margin-bottom: 3rem;
      `}
    >
      <span
        css={`
          text-transform: uppercase;
        `}
      >
        Data Shortcut
      </span>
      <div
        css={`
          height: 2.5rem;
          webkit-appearance: none;
          background: transparent;
          border: 1px solid ${colors[POSITIVE].background};
          border-radius: 2px;
          color: ${colors[NEGATIVE].text};
          display: flex;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          align-items: center;
          cursor: pointer;
          width: 100%;
          min-width: 80vw;
          @media screen and (min-width: 800px) {
            min-width: 24rem;
          }
        `}
      >
        <input
          type="text"
          value={value}
          placeholder="Go directly to a campaign, platform, or instrument"
          onChange={handleSearch}
          css={`
            webkit-appearance: none;
            background: transparent;
            border: unset;
            border-radius: 2px;
            color: ${colors[NEGATIVE].text};
            display: flex;
            margin-left: 5px;
            cursor: pointer;
            width: 100%;
          `}
        />
        <span
          role="img"
          aria-label="Arrow icon"
          css={`
            display: grid;
            place-content: center;
          `}
        >
          <ArrowIcon color={colors[NEGATIVE].text} />
        </span>
      </div>
      <div className="type-ahead-dropdown">
        {typeAheadDisplay.length > 0 && (
          <ul
            css={`
              position: absolute;
              background-color: #303641;
              border: 1px solid #ccc;
              border-radius: 4px;
              list-style-type: none;
              margin: 0;
              padding: 0;
              z-index: 1;
              width: 100%;
            `}
          >
            {typeAheadDisplay.map((item, index) => (
              <Link to={`${item?.link}`} key={`${index}-${item?.short_name}`}>
                <li
                  key={`${index}-${item?.short_name}`}
                  css={`
                    padding: 8px 16px;
                    cursor: pointer;
                    &:hover {
                      background-color: rgba(255, 255, 255, 0.2);
                    }
                  `}
                >
                  <span>{item?.short_name || item?.long_name} </span>
                  <span>- &#40;{item?.parent}&#41;</span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
