import React, { useState } from "react";
import PropTypes from "prop-types";
import { sortFunctions, typeAhead } from "../utils/filter-utils"

export function TypeAhead({ campaigns, platforms, instruments, onSearch }) {
    const [value, setValue] = useState("");
    const [topTen, setTopTen] = useState([]);
    const handleSearch = (event) => {

        let caseiData = {
            'Campaign': campaigns.nodes,
            'Platform': platforms.nodes,
            'Instrument': instruments.nodes,
        }

        let results = typeAhead.searchData(event.target.value, caseiData)

        let resultNums = {
            'Campaign': results['Campaign'].length,
            'Platform': results['Platform'].length,
            'Instrument': results['Instrument'].length,
        }

        console.log({ resultNums })
        // get top 10 results as an array

        let newTopTen = []
        // push a slice of size 4 from each sub array in results into newTopTen array
        for (const key in results) {
            newTopTen.push(
                (key, results[key].slice(0, 4))
            )
        }

        setTopTen(newTopTen)
        console.log({ newTopTen })

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
                {topTen.length > 0 && (
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
                        {topTen.map((item, index) => (
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
                                Short Name: {item[index].short_name || item[index].long_name}
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

