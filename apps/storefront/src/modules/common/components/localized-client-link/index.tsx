"use client"

import Link from "next/link"
import React from "react"

/**
 * App-wide link component. The country code lives only in the internal route
 * tree (the middleware rewrites clean URLs to /{countryCode}/...), so hrefs
 * are used as-is — no prefix in the visible URL.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: unknown
}) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
