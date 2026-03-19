import React from 'react'

export default function VisitCounter() {
  return (
    <div style={{
      color: 'rgba(255,255,255,0.35)',
      fontSize: '11px',
      fontFamily: "'Courier New', monospace",
      letterSpacing: '0.06em',
      marginTop: '24px',
      display: 'flex', 
      justifyContent: 'center'
    }}>
      <img
        src="https://hits.sh/acmigdtuw.github.io/acm-site.svg?style=flat&label=Visits&color=555&labelColor=222"
        alt="Visit counter"
        style={{ verticalAlign: 'middle', opacity: 0.6 }}
      />
    </div>
  )
}