import { getSection } from "@lib/data/site"
import Logo from "@modules/common/components/logo"
import { clx } from "@modules/common/components/ui"

export type BrandSection = {
  logoUrl: string | null
  logoLightUrl: string | null
}

export const BRAND_FALLBACK: BrandSection = {
  logoUrl: null,
  logoLightUrl: null,
}

type BrandLogoProps = {
  variant?: "ink" | "cream"
  className?: string
}

/**
 * Brand logo managed from the admin: renders the uploaded image when set,
 * otherwise falls back to the built-in SVG mark.
 */
const BrandLogo = async ({ variant = "ink", className }: BrandLogoProps) => {
  const brand = await getSection<BrandSection>("brand", BRAND_FALLBACK)
  const src = variant === "cream" ? brand.logoLightUrl : brand.logoUrl

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="MACH HOME"
        className={clx("h-11 w-auto object-contain", className)}
      />
    )
  }

  return <Logo variant={variant} className={className} />
}

export default BrandLogo
