/**
 * DexScreener API client for LPAI token
 * https://docs.dexscreener.com/api/reference
 */

const LPAI_MINT = '8tHBJTvEXakQXtPXB5xGC2mUNcZF1dXsCLPX2QZkpump'
const DEXSCREENER_URL = `https://api.dexscreener.com/latest/dex/tokens/${LPAI_MINT}`

/**
 * Fetch latest LPAI pair data from DexScreener
 * @returns {Promise<{ priceUsd: string, priceNative: string, volume: object, txns: object, priceChange: object } | null>}
 */
export async function fetchLpaiData() {
  try {
    const res = await fetch(DEXSCREENER_URL)
    if (!res.ok) return null
    const json = await res.json()
    const pair = json?.pairs?.[0]
    if (!pair) return null
    return {
      priceUsd: pair.priceUsd ?? '0',
      priceNative: pair.priceNative ?? '0',
      volume: pair.volume ?? { h24: 0, h6: 0, h1: 0, m5: 0 },
      txns: pair.txns ?? { m5: {}, h1: {}, h6: {}, h24: {} },
      priceChange: pair.priceChange ?? { h1: 0, h6: 0, h24: 0 },
      fdv: pair.fdv,
      marketCap: pair.marketCap,
      url: pair.url,
      pairAddress: pair.pairAddress,
    }
  } catch (e) {
    console.warn('DexScreener fetch failed:', e)
    return null
  }
}
