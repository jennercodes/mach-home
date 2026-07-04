import { clx } from "@modules/common/components/ui"

type LogoProps = {
  variant?: "ink" | "cream"
  className?: string
}

/** MACH HOME brand mark (mountains + wordmark). */
const Logo = ({ variant = "ink", className }: LogoProps) => {
  const fill = variant === "ink" ? "#212121" : "#fff6ea"

  return (
    <svg
      viewBox="0 0 200 70"
      xmlns="http://www.w3.org/2000/svg"
      className={clx("h-11 w-auto", className)}
      role="img"
      aria-label="MACH HOME"
    >
      <g fill={fill}>
        <path d="M10 38 L25 14 L40 38 Z" />
        <path d="M28 38 L35 22 L42 32 L49 22 L56 38 L52 38 L49 28 L42 38 L35 28 L32 38 Z" />
        <path d="M62 14 L66 14 L66 38 L62 38 Z" />
        <path d="M70 18 L74 18 L74 38 L70 38 Z" />
        <path d="M80 38 L100 12 L118 38 Z" />
      </g>
      <line x1="8" y1="44" x2="120" y2="44" stroke={fill} strokeWidth="1.5" />
      <text
        x="64"
        y="60"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="3"
        fill={fill}
      >
        MACH HOME
      </text>
      <line x1="8" y1="65" x2="120" y2="65" stroke={fill} strokeWidth="1" />
    </svg>
  )
}

export default Logo
