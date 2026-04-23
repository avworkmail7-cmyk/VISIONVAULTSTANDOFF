import { useState, useEffect } from 'react'
import LpaiChartContent from '../../components/app/LpaiChartContent'
import { fetchLpaiData } from '../../lib/dexscreener'
import './LpaiChart.css'

const PUMP_FUN_COIN_URL = 'https://pump.fun/coin/8tHBJTvEXakQXtPXB5xGC2mUNcZF1dXsCLPX2QZkpump'
const DEXSCREENER_URL = 'https://dexscreener.com/solana/gjyxdfummajpekqqy1jqtylgmmhmbrii9viezf4jbt2b'
const POLL_MS = 60000

export default function LpaiChart() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await fetchLpaiData()
      setData(result)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const id = setInterval(async () => {
      const result = await fetchLpaiData()
      setData(result)
    }, POLL_MS)
    return () => clearInterval(id)
  }, [])

  const txns = data?.txns ?? {}
  const h24 = txns.h24 ?? { buys: 0, sells: 0 }
  const h6 = txns.h6 ?? { buys: 0, sells: 0 }
  const h1 = txns.h1 ?? { buys: 0, sells: 0 }

  return (
    <div className="lpai-chart">
      <p className="lpai-chart__label">$LPAI</p>
      <h2 className="lpai-chart__title">Chart</h2>
      <p className="lpai-chart__sub">Live price and volume from Pump.Fun.</p>

      <div className="lpai-chart__chart-wrap">
        <LpaiChartContent data={data} loading={loading} />
      </div>
      <div className="lpai-chart__card">
        <a
          href={PUMP_FUN_COIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lpai-chart__link"
        >
          View on Pump.Fun
        </a>
        <a
          href={DEXSCREENER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lpai-chart__link lpai-chart__link--sec"
        >
          View on DexScreener
        </a>
      </div>

      <p className="lpai-chart__section-label">TRADES</p>

      <div className="lpai-chart__buy-sell">
        <p className="lpai-chart__buy-sell-title">Recent activity</p>
        <div className="lpai-chart__buy-sell-grid">
          <div className="lpai-chart__buy-sell-item lpai-chart__buy-sell-item--buy">
            <span className="lpai-chart__buy-sell-label">Buys 24h</span>
            <span className="lpai-chart__buy-sell-value">{h24.buys ?? 0}</span>
          </div>
          <div className="lpai-chart__buy-sell-item lpai-chart__buy-sell-item--sell">
            <span className="lpai-chart__buy-sell-label">Sells 24h</span>
            <span className="lpai-chart__buy-sell-value">{h24.sells ?? 0}</span>
          </div>
          <div className="lpai-chart__buy-sell-item lpai-chart__buy-sell-item--buy">
            <span className="lpai-chart__buy-sell-label">Buys 6h</span>
            <span className="lpai-chart__buy-sell-value">{h6.buys ?? 0}</span>
          </div>
          <div className="lpai-chart__buy-sell-item lpai-chart__buy-sell-item--sell">
            <span className="lpai-chart__buy-sell-label">Sells 6h</span>
            <span className="lpai-chart__buy-sell-value">{h6.sells ?? 0}</span>
          </div>
          <div className="lpai-chart__buy-sell-item lpai-chart__buy-sell-item--buy">
            <span className="lpai-chart__buy-sell-label">Buys 1h</span>
            <span className="lpai-chart__buy-sell-value">{h1.buys ?? 0}</span>
          </div>
          <div className="lpai-chart__buy-sell-item lpai-chart__buy-sell-item--sell">
            <span className="lpai-chart__buy-sell-label">Sells 1h</span>
            <span className="lpai-chart__buy-sell-value">{h1.sells ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
