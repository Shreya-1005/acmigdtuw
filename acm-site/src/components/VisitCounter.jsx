import { useEffect, useState } from 'react'

// Lightweight, no-backend counter for static hosting (GitHub Pages).
// Namespace/key can be changed anytime without breaking the UI.
const COUNTAPI_URL = 'https://api.countapi.xyz/hit/acmigdtuw-acmigdtuw/acm-site-visits'

export default function VisitCounter() {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(COUNTAPI_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return
        const value = typeof data?.value === 'number' ? data.value : null
        setVisits(value)
      })
      .catch(() => {
        if (!cancelled) setVisits(null)
      })
    return () => { cancelled = true }
  }, [])

  return (
    <div style={{
      color: 'rgba(255,255,255,0.35)',
      fontSize: '11px',
      fontFamily: "'Courier New', monospace",
      letterSpacing: '0.06em',
      marginTop: '24px',
    }}>
      Visits: <span style={{ color: 'rgba(255,255,255,0.6)' }}>{visits ?? '—'}</span>
    </div>
  )
}

