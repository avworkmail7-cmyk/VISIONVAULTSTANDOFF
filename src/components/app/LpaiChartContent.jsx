import { useState, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import { format } from 'date-fns'
import { fetchLpaiData } from '../../lib/dexscreener'
import './LpaiChartContent.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
)

const POLL_INTERVAL_MS = 60000 // 1 min
const MAX_POINTS = 60

const darkChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false, mode: 'index' },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(12, 12, 18, 0.95)',
      titleColor: '#e8e8ec',
      bodyColor: '#e8e8ec',
      borderColor: 'rgba(0, 255, 200, 0.2)',
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (ctx) => `$${Number(ctx.raw).toFixed(8)}`,
      },
    },
    zoom: {
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: 'xy',
      },
      pan: {
        enabled: true,
        mode: 'xy',
      },
      limits: {
        x: { min: 'original', max: 'original' },
        y: { min: 'original', max: 'original' },
      },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(0, 255, 200, 0.06)' },
      ticks: {
        color: '#8888a0',
        maxTicksLimit: 8,
        font: { size: 10 },
      },
    },
    y: {
      grid: { color: 'rgba(0, 255, 200, 0.06)' },
      ticks: {
        color: '#8888a0',
        font: { size: 10 },
        callback: (v) => {
          const n = Number(v)
          if (n >= 1) return '$' + n.toFixed(2)
          if (n >= 0.01) return '$' + n.toFixed(4)
          if (n >= 0.0001) return '$' + n.toFixed(6)
          return '$' + n.toFixed(8)
        },
      },
    },
  },
}

export default function LpaiChartContent({ data: dataProp, loading: loadingProp }) {
  const [priceHistory, setPriceHistory] = useState([])
  const [internalData, setInternalData] = useState(null)
  const [internalLoading, setInternalLoading] = useState(true)
  const chartRef = useRef(null)
  const data = dataProp ?? internalData
  const loading = loadingProp ?? internalLoading

  useEffect(() => {
    if (dataProp != null) return
    async function load() {
      const result = await fetchLpaiData()
      if (result) {
        const price = parseFloat(result.priceUsd) || 0
        const now = new Date()
        setPriceHistory((prev) => {
          const next = [...prev, { t: now, p: price }]
          return next.slice(-MAX_POINTS)
        })
        setInternalData(result)
      }
      setInternalLoading(false)
    }
    load()
  }, [dataProp])

  useEffect(() => {
    if (dataProp != null) return
    const id = setInterval(async () => {
      const result = await fetchLpaiData()
      if (result) {
        const price = parseFloat(result.priceUsd) || 0
        const now = new Date()
        setPriceHistory((prev) => {
          const next = [...prev, { t: now, p: price }]
          return next.slice(-MAX_POINTS)
        })
        setInternalData(result)
      }
    }, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [dataProp])

  useEffect(() => {
    if (!data) return
    const price = parseFloat(data.priceUsd) || 0
    if (price <= 0) return
    setPriceHistory((prev) => {
      const last = prev[prev.length - 1]
      if (last && Math.abs(last.p - price) < 1e-15) return prev
      if (prev.length >= 2) {
        const next = [...prev, { t: new Date(), p: price }]
        return next.slice(-MAX_POINTS)
      }
      const priceChange = (data.priceChange?.h24 ?? 0) / 100
      const startMult = 1 - (priceChange || 0)
      const count = 30
      const points = []
      for (let i = 0; i <= count; i++) {
        const progress = i / count
        const p = price * (startMult + (1 - startMult) * progress)
        points.push({ t: new Date(Date.now() - (count - i) * 60000), p })
      }
      return points
    })
  }, [data])

  const displayHistory = (() => {
    const price = data?.priceUsd ? parseFloat(data.priceUsd) : 0
    if (priceHistory.length >= 2) return priceHistory
    if (data && price > 0) {
      const priceChange = (data.priceChange?.h24 ?? 0) / 100
      const startMult = 1 - (priceChange || 0)
      const count = 30
      const out = []
      for (let i = 0; i <= count; i++) {
        const progress = i / count
        out.push({
          t: new Date(Date.now() - (count - i) * 60000),
          p: price * (startMult + (1 - startMult) * progress),
        })
      }
      return out
    }
    return []
  })()

  const chartData = {
    labels: displayHistory.map((d) => format(d.t, 'HH:mm')),
    datasets: [
      {
        label: '$LPAI',
        data: displayHistory.map((d) => d.p),
        borderColor: 'rgba(0, 255, 200, 0.9)',
        backgroundColor: 'rgba(0, 255, 200, 0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  }

  const price = data?.priceUsd ? parseFloat(data.priceUsd) : 0
  const priceChange = data?.priceChange?.h24 ?? 0
  const isUp = priceChange >= 0
  const error = !loading && !data && !dataProp ? 'Could not load price data' : null

  const hasChartData = displayHistory.length >= 2

  if (loading) {
    return (
      <div className="lpai-chart-content lpai-chart-content--loading">
        <span>Loading chart…</span>
      </div>
    )
  }

  if (error && !dataProp) {
    return (
      <div className="lpai-chart-content lpai-chart-content--error">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="lpai-chart-content">
      <div className="lpai-chart-content__header">
        <span className="lpai-chart-content__symbol">$LPAI</span>
        <span className="lpai-chart-content__price">
          ${price > 0 ? price.toFixed(8) : '—'}
        </span>
        <span className={`lpai-chart-content__change ${isUp ? 'lpai-chart-content__change--up' : 'lpai-chart-content__change--down'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}% 24h
        </span>
      </div>
      <div className="lpai-chart-content__chart">
        {hasChartData ? (
          <Line ref={chartRef} data={chartData} options={darkChartOptions} />
        ) : (
          <div className="lpai-chart-content__chart-placeholder">Building chart…</div>
        )}
      </div>
      {data?.volume?.h24 != null && (
        <div className="lpai-chart-content__volume">
          Vol 24h: ${Number(data.volume.h24).toFixed(0)}
        </div>
      )}
    </div>
  )
}
