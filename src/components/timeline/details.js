import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { colors } from "../../theme"
import { POSITIVE } from "../../utils/constants"
import { CloseIcon } from "../../icons"
import { IconButton } from "../button"

const Label = styled.label`
  font-size: 0.75rem;
  color: ${colors[POSITIVE].altText};
`

export const Details = ({ xPosition, yPosition, id, close }) => {
  /*
   * We can not pass props directly into a static query because it is
   * compiled and doesn't support string interpolation in its template literal.
   * This is a workaround to still build a reuseable component:
   * It first queries all the images with graphql, and then uses javascript to filter
   * them based on the provided props.
   *
   * Read more here on this topic:
   * - https://noahgilmore.com/blog/easy-gatsby-image-components/
   * - https://spectrum.chat/gatsby-js/general/using-variables-in-a-staticquery~abee4d1d-6bc4-4202-afb2-38326d91bd05
   */
  const data = useStaticQuery(graphql`
    query {
      allDeployment {
        nodes {
          id
          shortname: short_name
          longname: long_name
          aliases {
            shortname: short_name
          }
          startdate: start_date
          enddate: end_date
          bounds: spatial_bounds
          regions: geographical_regions {
            shortname: short_name
          }
        }
      }
    }
  `)

  const deployment = data.allDeployment.nodes.find(x => x.id === id)

  if (!deployment) return

  const ref = useRef(null)
  const [{ width, height }, setDimensions] = useState({
    width: 200,
    height: 200,
  })

  useEffect(() => {
    setDimensions({
      width: ref.current?.getBoundingClientRect().width || width,
      height: ref.current?.getBoundingClientRect().height || height,
    })
  }, [ref.current])

  return (
    <div
      ref={ref}
      css={`
        position: absolute;
        z-index: 10;
        left: ${xPosition}px;
        bottom: ${yPosition}px;
        background-color: ${colors[POSITIVE].background};
        color: black;
        font-weight: 600;
        border-radius: 2px;
        padding: 5px 10px;
        max-width: 300px;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: flex-end;
          margin-top: 5px;
        `}
      >
        <IconButton
          id="close-popup"
          action={() => close()}
          icon={<CloseIcon color={colors[POSITIVE].text} />}
        />
      </div>

      <Label>Name</Label>
      <p>
        {deployment.longname
          ? deployment.longname + " (" + deployment.shortname + ")"
          : deployment.shortname}
      </p>

      {deployment.aliases.length > 0 && (
        <>
          <Label>Alias{deployment.aliases.length > 1 && "es"}</Label>
          <p>{deployment.aliases.map(x => x.shortname).join(", ")}</p>
        </>
      )}

      {deployment.regions.length > 0 && (
        <>
          <Label>Region{deployment.regions.length > 1 && "s"}</Label>
          <p>{deployment.regions.map(x => x.shortname).join(", ")}</p>
        </>
      )}
    </div>
  )
}

Details.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
}
