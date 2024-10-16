import React from "react"
import PropTypes from "prop-types"
import { sizes } from "../utils"

export default function AccountingIcon({ color = "#FFF", size = "text" }) {
  return (
    <svg
      width={sizes[size].width}
      height={sizes[size].height}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Accounting</title>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(3)" fill={color} fillRule="nonzero">
          <path d="M29.531 14.156c.777 0 1.407-.63 1.407-1.406V1.406C30.938.63 30.308 0 29.53 0h-22.5c-.776 0-1.406.63-1.406 1.406V12.75c0 .777.63 1.406 1.406 1.406h22.5zM8.438 2.812h19.687v8.532H8.437V2.813z" />
          <path d="M23.906 5.719h-5.625a1.406 1.406 0 000 2.812h5.625a1.406 1.406 0 000-2.812zM0 18.375v11.25c0 .777.63 1.406 1.406 1.406h28.125c.777 0 1.407-.63 1.407-1.406v-11.25c0-.777-.63-1.406-1.407-1.406H1.406c-.776 0-1.406.63-1.406 1.406zm2.813 1.406h25.312v8.438H2.812V19.78z" />
          <path d="M23.906 22.594h-11.25a1.406 1.406 0 000 2.812h11.25a1.406 1.406 0 000-2.812zM29.531 33.844h-22.5c-.776 0-1.406.63-1.406 1.406v11.344c0 .776.63 1.406 1.406 1.406h22.5c.777 0 1.407-.63 1.407-1.406V35.25c0-.777-.63-1.406-1.407-1.406zm-1.406 11.343H8.437v-8.53h19.688v8.53z" />
          <path d="M18.281 42.281h5.625a1.406 1.406 0 000-2.812h-5.625a1.406 1.406 0 000 2.812zM33.75 40.875a4.224 4.224 0 004.219 4.219 4.224 4.224 0 004.218-4.219 4.225 4.225 0 00-2.812-3.977v-8.921A4.225 4.225 0 0042.188 24a4.225 4.225 0 00-2.813-3.977v-8.921a4.225 4.225 0 002.813-3.977 4.224 4.224 0 00-4.22-4.219 4.224 4.224 0 00-4.218 4.219 4.225 4.225 0 002.813 3.977v8.921A4.225 4.225 0 0033.75 24a4.225 4.225 0 002.813 3.977v8.921a4.225 4.225 0 00-2.813 3.977zm4.219 1.406c-.776 0-1.407-.63-1.407-1.406 0-.775.63-1.406 1.406-1.406h.002c.775 0 1.405.63 1.405 1.406 0 .775-.63 1.406-1.406 1.406zm0-36.562c.775 0 1.406.63 1.406 1.406 0 .775-.63 1.406-1.406 1.406-.776 0-1.407-.63-1.407-1.406 0-.775.631-1.406 1.407-1.406zm0 16.875c.775 0 1.406.63 1.406 1.406 0 .775-.63 1.406-1.406 1.406-.776 0-1.407-.63-1.407-1.406 0-.775.631-1.406 1.407-1.406z" />
          <circle cx={12.656} cy={40.875} r={1.406} />
          <circle cx={7.031} cy={24} r={1.406} />
          <circle cx={12.656} cy={7.125} r={1.406} />
        </g>
        <path d="M0 0h48v48H0z" />
        <path d="M0 0h48v48H0z" />
      </g>
    </svg>
  )
}

AccountingIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}
