import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { times } from "lodash"

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

export default function Upcoming() {
  const [query, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://admg.nasa-impact.net/api/campaign`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.ADMG_ACCESS_TOKEN}`,
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
    <div
      css={`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <h1>Campaigns, Instruments, and Platforms in Review</h1>
      <h2>Campaigns</h2>

      {query ? (
        query.data.map((item, idx) => <div key={idx}>{item.short_name}</div>)
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
        <></>
      )}
    </div>
  )
}
