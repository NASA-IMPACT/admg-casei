import React, { useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Timeline } from "@knight-lab/timelinejs"
import "@knight-lab/timelinejs/dist/css/timeline.css"
import "./timeline-styles.css"

export const CampaignsTimeline = ({}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }
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
        url:
          campaign.logo && campaign.logo.gatsbyImg
            ? campaign.logo?.gatsbyImg.childImageSharp.gatsbyImageData.images
                .fallback.src
            : "",
        link: `${data.site.pathPrefix}/campaign/${campaign.shortname}`,
        thumbnail:
          campaign.logo && campaign.logo.gatsbyImg
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
        text:
          `<p class="tl-subheading"
            >
              ${campaign.longname}
            </p>` +
          `<p>${
            // if campaign logo exists, truncate campaign description text after 550 characters to avoid container overflow
            !campaign.logo
              ? campaign.description
              : campaign.description.substring(0, 650) +
                (campaign.description.length > 650 ? "..." : "")
          }
          </p>` +
          `<a class="tl-button button-clickable" href="${data.site.pathPrefix}/campaign/${campaign.shortname}" target="_self">View campaign</a>`,
      },
    })),
  }

  const timelineEl = useRef(null)
  useEffect(() => {
    const additionalOptions = {
      font: null,
      default_bg_color: "#303641",
      debug: true,
    }
    if (timelineEl.current != null) {
      new Timeline(timelineEl.current, timelineData, additionalOptions)
    }
  }, [])
  return (
    <div
      css={`
        height: 650px;
      `}
      ref={timelineEl}
    />
  )
}
