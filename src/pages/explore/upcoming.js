import React, { useEffect, useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { times } from "lodash"
import { Link } from "gatsby"
import ExternalLink from "../../components/external-link"
import { colors } from "../../theme"
import { NEGATIVE } from "../../utils/constants"
import { ArrowIcon } from "../../icons"
import Layout, {
  PageBody,
  SectionContent,
  Paragraph,
  Section,
} from "../../components/layout"
import SEO from "../../components/seo"

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    margin: -4px 0 0 -4px;
  }
  div:nth-child(1) {
    animation-delay: -0.036s;
  }
  div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  div:nth-child(2) {
    animation-delay: -0.072s;
  }
  div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  div:nth-child(3) {
    animation-delay: -0.108s;
  }
  div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  div:nth-child(4) {
    animation-delay: -0.144s;
  }
  div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  div:nth-child(5) {
    animation-delay: -0.18s;
  }
  div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  div:nth-child(6) {
    animation-delay: -0.216s;
  }
  div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  div:nth-child(7) {
    animation-delay: -0.252s;
  }
  div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  div:nth-child(8) {
    animation-delay: -0.288s;
  }
  div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const DataSection = ({ title, data }) => {
  return (
    <div
      css={`
        margin-bottom: 2rem;
      `}
    >
      <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      {data.length ? (
        data.map((entry, idx) => <div key={idx}>{entry.update.short_name}</div>)
      ) : (
        <div>{`No ${title} in review.`}</div>
      )}
    </div>
  )
}

export default function Upcoming() {
  const [query, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const contentTypes = [
    {
      title: "campaigns",
      data: query?.data.filter(item => item.content_type === 21),
    },
    {
      title: "platforms",
      data: query?.data.filter(item => item.content_type === 40),
    },
    {
      title: "instruments",
      data: query?.data.filter(item => item.content_type === 41),
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${process.env.GATSBY_ADMG_API}/unpublished_drafts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const vals = await response.json()
        setIsLoading(false)
        setResponse(vals)
      } catch (error) {
        setIsLoading(false)
        console.log("catch error", error)
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <SEO title="Coming Soon" lang="en" />
      <PageBody>
        <Link
          to={"/explore/campaigns"}
          css={`
             {
              color: ${colors[NEGATIVE].linkText};
              cursor: pointer;
              display: flex;
              align-items: center;
              margin-top: 2rem;
            }
          `}
          data-cy="back-link"
        >
          <ArrowIcon color={colors[NEGATIVE].linkText} direction="left" />
          Back to Explore
        </Link>
        <h1>Coming Soon to CASEI</h1>
        <Section id="coming-soon-content">
          <SectionContent>
            <Paragraph>
              The lists below show Campaigns, Platforms, and Instruments
              currently undergoing ADMG&apos;s CASEI metadata curation and
              vetting process. Once approved, the items below will be available
              on this interface. If you&apos;d like to request a higher priority
              for one of these (or another) Campaign, Platform, or Instrument,
              please contact{" "}
              <ExternalLink
                url="https://impact.earthdata.nasa.gov/casei/contact/"
                label="ADMG"
                id="contact"
              />
              .
            </Paragraph>
          </SectionContent>
          <SectionContent>
            {query ? (
              <>
                {contentTypes.map((props, idx) => (
                  <DataSection {...props} key={idx} />
                ))}
              </>
            ) : isLoading ? (
              <div
                css={`
                  display: flex;
                  flex-direction: column;
                  flex: 1;
                  width: 100%;
                  height: 100%;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <Loader>
                  {times(8, idx => (
                    <div key={idx + "_loader_point"} />
                  ))}
                </Loader>
              </div>
            ) : (
              <>No metadata in review.</>
            )}
          </SectionContent>
        </Section>
      </PageBody>
    </Layout>
  )
}

DataSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.any,
}
