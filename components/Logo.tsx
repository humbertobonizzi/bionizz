interface Props {
  size?: number
  className?: string
}

export function LogoMark({ size = 28, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#1B2B5E" />
      <path
        d="M9 11.5L13.5 16L9 20.5"
        stroke="#00C896"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.5 20.5H23" stroke="#00C896" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ size = 28, className = '' }: Props) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark size={size} className={className} />
      <span className="font-mono-display font-bold text-[#1B2B5E] tracking-tight" style={{ fontSize: size * 0.64 }}>
        bionizz
      </span>
    </span>
  )
}
