import React, { useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Timeline } from "@knight-lab/timelinejs"
import "@knight-lab/timelinejs/dist/css/timeline.css"

export const CampaignsTimeline = ({}) => {
  const data = useStaticQuery(graphql`
    query {
      allCampaign {
        nodes {
          logo {
            gatsbyImg {
              childImageSharp {
                gatsbyImageData(height: 350, transformOptions: { fit: CONTAIN })
              }
            }
          }
          shortname: short_name
          longname: long_name
          startdate: start_date
          enddate: end_date
          description: description_short
        }
      }
    }
  `)

  const timelineData = {
    events: data.allCampaign.nodes.map(campaign => ({
      media: {
        url: campaign.logo
          ? campaign.logo?.gatsbyImg.childImageSharp.gatsbyImageData.images
              .fallback.src
          : "",
      },
      start_date: {
        month: campaign.startdate.split("-")[1],
        day: campaign.startdate.split("-")[2],
        year: campaign.startdate.split("-")[0],
      },
      end_date: {
        month: campaign.enddate.split("-")[1],
        day: campaign.enddate.split("-")[2],
        year: campaign.enddate.split("-")[0],
      },
      text: {
        headline: campaign.shortname,
        text: campaign.description,
      },
    })),
  }

  const timelineEl = useRef(null)
  useEffect(() => {
    const additionalOptions = {
      font: "'Titillium Web', Titillium Web",
      default_bg_color: "#303641",
    }
    if (timelineEl.current != null) {
      new Timeline(timelineEl.current, timelineData, additionalOptions)
    }
  }, [])
  return (
    <div
      css={`
        height: 600px;
      `}
      ref={timelineEl}
      className="timeline"
    />
  )
}
