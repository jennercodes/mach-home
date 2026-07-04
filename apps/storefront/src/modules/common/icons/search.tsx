import React from "react"

import { IconProps } from "types/icon"

const Search: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.5" />
      <path
        d="m20 20-3.5-3.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Search
