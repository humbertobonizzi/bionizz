'use client'
import { useEffect } from 'react'

interface Props {
  slot: string
  className?: string
}

export default function AdSlot({ slot, className = '' }: Props) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle not typed
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // ignore
    }
  }, [])

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
