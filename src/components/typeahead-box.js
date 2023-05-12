import React, { useState } from "react"
import PropTypes from "prop-types"
import { typeAhead } from "../utils/filter-utils"
import { useStaticQuery, graphql } from "gatsby"

import { NEGATIVE, POSITIVE } from "../utils/constants"
import { colors } from "../theme"
import { SearchIcon } from "../icons"

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
        `
    )

    const [value, setValue] = useState("")
    const [typeAheadDisplay, setTypeAheadDisplay] = useState([])
    const handleSearch = event => {
        let caseiData = {
            Campaign: queryData.allCampaign.nodes.map(node => {
                return { parent: "Campaign", link: `/campaign/${node.short_name}`, ...node }
            }),
            Platform: queryData.allPlatform.nodes.map(node => {
                return { parent: "Platform", link: `/platform/${node.short_name}`, ...node }
            }),
            Instrument: queryData.allInstrument.nodes.map(node => {
                return { parent: "Instrument", link: `/instrument/${node.short_name}`, ...node }
            }),
        }

        let results = typeAhead.searchData(event.target.value, caseiData)

        let searchResult = []
        // push a slice of size N from each sub array in results into searchResult array
        for (const key in results) {
            searchResult = searchResult.concat(results[key].slice(0, 5))
        }
        setTypeAheadDisplay(searchResult)

        setValue(event.target.value)
    }
    return (
        <div
            css={`
        margin-right: 2rem;
        margin-bottom: 5em;
        position: relative;
      `}
        >
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
        `}
            >
                <span role="img" aria-label="Magnifying glass icon">
                    <SearchIcon color={colors[NEGATIVE].text} />
                </span>
                <input
                    type="text"
                    value={value}
                    placeholder="Enter a campaign, platform, or instrument"
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
                            <a href={`${item?.link}`}>
                                <li
                                    key={index}
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
                            </a>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}



TypeAhead.propTypes = {
    data: PropTypes.any,
    placeholder: PropTypes.string,
    onSearch: PropTypes.object,
}
