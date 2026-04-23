import { useState, useEffect, useRef } from 'react'
import './ChartPlaceholder.css'

const POINTS = 60
const TICK_MS = 800

function generateRandomWalk(length, start = 50) {
  const out = [start]
  for (let i = 1; i < length; i++) {
    const prev = out[i - 1]
    const change = (Math.random() - 0.48) * 8
    out.push(Math.max(5, Math.min(95, prev + change)))
  }
  return out
}

export default function ChartPlaceholder() {
  const [data, setData] = useState(() => generateRandomWalk(POINTS))
  const containerRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1)
        const last = next[next.length - 1] ?? 50
        const change = (Math.random() - 0.48) * 6
        next.push(Math.max(5, Math.min(95, last + change)))
        return next
      })
    }, TICK_MS)
    return () => clearInterval(t)
  }, [])

  const path = data
    .map((y, i) => {
      const x = (i / (data.length - 1)) * 100
      return `${i === 0 ? 'M' : 'L'} ${x} ${100 - y}`
    })
    .join(' ')

  const last = data[data.length - 1] ?? 50
  const prev = data[data.length - 2] ?? 50
  const isUp = last >= prev

  return (
    <div className="chart-placeholder" ref={containerRef}>
      <div className="chart-placeholder__header">
        <span className="chart-placeholder__symbol">$LPAI</span>
        <span className={`chart-placeholder__change ${isUp ? 'chart-placeholder__change--up' : 'chart-placeholder__change--down'}`}>
          {isUp ? '▲' : '▼'} {Math.abs((last - prev).toFixed(2))}%
        </span>
      </div>
      <div className="chart-placeholder__svg-wrap">
        <svg className="chart-placeholder__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={path} className="chart-placeholder__line" fill="none" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="chart-placeholder__fake-trades">
        <span>BUY 0.24</span>
        <span>SELL 0.18</span>
        <span>BUY 0.51</span>
        <span>SELL 0.33</span>
      </div>
    </div>
  )
}
