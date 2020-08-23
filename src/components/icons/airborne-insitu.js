import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

export const AirborneInsitu = ({ color = "#FFF", size = "large" }) => (
  <svg
    viewBox="0 0 80 80"
    width={sizes[size].width}
    height={sizes[size].height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M49.337 76.811l.29 2.233c-1.487.193-3 .29-4.492.29-1.478 0-2.959-.095-4.408-.281l.288-2.233a32.7 32.7 0 008.322-.009zm-20.1-3.956c2.414 1.386 5 2.453 7.689 3.166l-.578 2.176a34.101 34.101 0 01-8.232-3.39l1.12-1.952zm31.867-.043l1.127 1.947a33.955 33.955 0 01-8.227 3.414l-.583-2.176a31.644 31.644 0 007.683-3.185zm-41.24-8.13a32.15 32.15 0 005.905 5.862l-1.368 1.79a34.426 34.426 0 01-6.315-6.273l1.778-1.38zm50.592-.063l1.783 1.37a34.24 34.24 0 01-6.301 6.29l-1.369-1.784a32.196 32.196 0 005.887-5.876zm-25.32-42.593c12.74 0 23.106 10.366 23.106 23.107 0 12.742-10.365 23.107-23.107 23.107-12.741 0-23.109-10.365-23.109-23.107 0-12.741 10.368-23.107 23.11-23.107zm-9.17 33.866l-.321.089c1.802 5.382 4.875 9.212 8.365 9.898V54.743c-2.811.084-5.547.482-8.044 1.149zm10.295-1.149V65.88c3.489-.686 6.562-4.516 8.364-9.897-2.582-.721-5.432-1.15-8.364-1.239zM33.45 56.686l-.202.074c-1.45.546-2.781 1.193-3.952 1.929a20.933 20.933 0 008.59 6.002c-1.838-1.995-3.362-4.74-4.436-8.005zm23.372 0l-.105.308c-1.068 3.13-2.553 5.765-4.334 7.696a20.932 20.932 0 008.591-6.001c-1.224-.77-2.624-1.441-4.152-2.003zm-42.514-3.123a31.941 31.941 0 003.222 7.67l-1.944 1.133a34.058 34.058 0 01-3.448-8.211l2.17-.592zm61.673-.077l2.174.585a33.939 33.939 0 01-3.43 8.219l-1.944-1.13a31.792 31.792 0 003.2-7.674zM31.722 46.26h-7.415a20.729 20.729 0 003.612 10.637c1.448-.937 3.098-1.738 4.9-2.391-.635-2.53-1.018-5.308-1.097-8.246zm34.24 0h-7.414c-.078 2.938-.461 5.716-1.097 8.246 1.802.653 3.453 1.454 4.901 2.39a20.736 20.736 0 003.61-10.636zm-9.666 0l-10.036-.001v6.233c3.177.087 6.228.539 9.003 1.314.59-2.33.953-4.88 1.033-7.546zm-12.286-.001H33.975c.08 2.666.443 5.216 1.033 7.547 2.775-.775 5.826-1.227 9.002-1.314v-6.233zm-30.825-1.125c0 1.452.099 2.912.292 4.341l-2.23.304a34.756 34.756 0 01-.313-4.645h2.25zm65.877-4.332a34.66 34.66 0 01-.03 8.898l-2.232-.3a32.331 32.331 0 00.03-8.317l2.232-.28zm-51.143-7.43l-.098.143a20.726 20.726 0 00-3.514 10.493h7.415c.079-2.938.462-5.718 1.098-8.248-1.802-.652-3.452-1.453-4.901-2.388zm7.09 3.09l-.033.127a35.3 35.3 0 00-1.001 7.42l10.035-.001v-6.232c-3.176-.087-6.227-.54-9.001-1.315zm20.253 0l-.013.003c-2.77.773-5.818 1.224-8.989 1.31v6.233h10.036a35.235 35.235 0 00-1.034-7.547zm7.088-3.091l-.139.09c-1.415.898-3.016 1.669-4.76 2.3.636 2.53 1.019 5.309 1.097 8.247h7.414A20.73 20.73 0 0062.35 33.37zM32.11 0l5.442 5.441-9.53 9.528-1.926-1.926-2.478 2.481a5.78 5.78 0 01.99 3.25c0 1.558-.608 3.02-1.71 4.123a5.79 5.79 0 01-4.123 1.708 5.789 5.789 0 01-3.25-.988l-2.479 2.476 1.926 1.926-9.53 9.53L0 32.108l9.53-9.53 1.925 1.924 2.479-2.477a5.85 5.85 0 010-6.501l-1.706-1.707 1.591-1.59 1.706 1.706a5.85 5.85 0 016.5 0l2.48-2.481-1.925-1.924L32.11 0zm42.73 28.179a33.932 33.932 0 013.373 8.24l-2.176.572a31.768 31.768 0 00-3.15-7.696l1.953-1.116zm-39.191 6.094l-.005.013c2.583.72 5.433 1.15 8.367 1.237V24.387c-3.489.685-6.56 4.51-8.362 9.886zm10.612-9.886v11.136c2.932-.088 5.782-.518 8.365-1.237-1.803-5.383-4.876-9.213-8.365-9.899zM9.53 25.76l-6.349 6.348 2.26 2.26 6.348-6.349-2.26-2.26zm28.357-.186l-.024.01a20.943 20.943 0 00-8.568 5.993c1.225.77 2.625 1.443 4.154 2.004 1.075-3.266 2.6-6.012 4.438-8.007zm14.494 0l.028.032c1.826 1.991 3.34 4.725 4.41 7.973 1.529-.56 2.929-1.232 4.153-2.001a20.932 20.932 0 00-8.591-6.003zm-20.517-6.8c0 7.22-5.871 13.091-13.09 13.091v-2.25c5.979 0 10.84-4.863 10.84-10.84h2.25zm-3.504 0c0 5.285-4.3 9.585-9.586 9.585v-2.25c4.046 0 7.336-3.29 7.336-7.334h2.25zm37.759-.65a34.52 34.52 0 016.258 6.333l-1.791 1.361a32.137 32.137 0 00-5.849-5.916l1.382-1.778zm-47.345-2.927c-.916 0-1.834.346-2.532 1.046a3.586 3.586 0 000 5.063c1.355 1.353 3.71 1.353 5.063 0a3.56 3.56 0 001.051-2.531c0-.957-.373-1.857-1.05-2.532a3.558 3.558 0 00-2.532-1.046zm35.454-3.043a34.061 34.061 0 018.2 3.47l-1.14 1.938a31.841 31.841 0 00-7.659-3.236l.599-2.172zm-9.094-1.222c1.553 0 3.115.106 4.645.315l-.304 2.228a32.46 32.46 0 00-4.34-.292v-2.25zM32.11 3.182l-6.348 6.346 2.26 2.26L34.37 5.44l-2.26-2.259z"
    />
  </svg>
)

AirborneInsitu.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}
