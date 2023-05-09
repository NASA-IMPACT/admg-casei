import React, { useState } from "react";
import PropTypes from "prop-types";
import { sortFunctions, typeAhead } from "../utils/filter-utils"

export function TypeAhead({ campaigns, platforms, instruments, onSearch }) {
    const [value, setValue] = useState("");
    const [topFive, setTopFive] = useState([]);
    const handleSearch = (event) => {

        let results = typeAhead.searchCampaigns(event.target.value, campaigns.nodes)

        // get top 5 results
        let newTopFive = results.slice(0, 5);
        setTopFive(newTopFive)
        console.log({ newTopFive })

        setValue(event.target.value);

    };
    return (
        <div
            css={`
        margin-right: 2rem;
      `}
        >
            <input
                type="text"
                value={value}
                placeholder="Enter Search Term"
                onChange={handleSearch}
                css={`
          height: 2.5rem;
          webkit-appearance: none;
          background: transparent;
          border: 1px solid ;
          border-radius: 2px ;
          color: red ;
          padding: 0.5rem;
          cursor: pointer;
        `}
            />
            <div class='type-ahead-dropdown'>
                {topFive.length > 0 && (
                    <ul
                        css={`
                        position: absolute;
                        background-color: black;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        z-index: 1;
                    `}
                    >
                        {topFive.map((item, index) => (
                            <li
                                key={index}
                                css={`
                            padding: 8px 16px;
                            cursor: pointer;
                            &:hover {
                                background-color: #f1f1f1;
                            }
                        `
                                }
                            >
                                {item.id} - {item.long_name || item.short_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div >
    );
}

// TODO can and should this query be moved here
export const query = graphql`
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

TypeAhead.propTypes = {
    data: PropTypes.any,
    placeholder: PropTypes.string,
    onSearch: PropTypes.object,
};

