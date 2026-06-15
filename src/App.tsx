import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  RefreshCw,
  Search,
  TrendingUp,
} from 'lucide-react'
import './App.css'

type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number | null
  sparkline_in_7d?: {
    price: number[]
  }
}

type QuoteCurrency = 'brl' | 'usd'

type MarketData = Record<QuoteCurrency, Coin[]>

const quoteOptions: Array<{ code: QuoteCurrency; label: string }> = [
  { code: 'brl', label: 'BRL' },
  { code: 'usd', label: 'USD' },
]

const formatters = {
  brl: {
    currency: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }),
    compact: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 2,
    }),
  },
  usd: {
    currency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }),
    compact: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }),
  },
} satisfies Record<QuoteCurrency, Record<'currency' | 'compact', Intl.NumberFormat>>

function buildApiUrl(currency: QuoteCurrency) {
  const params = new URLSearchParams({
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: '30',
    page: '1',
    sparkline: 'true',
    price_change_percentage: '24h',
  })

  return `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`
}

function formatPercent(value: number | null) {
  if (value === null || Number.isNaN(value)) return '0.00%'
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

function SparklineChart({ values, positive }: { values: number[]; positive: boolean }) {
  const points = useMemo(() => {
    if (!values.length) return ''

    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1

    return values
      .map((value, index) => {
        const x = (index / (values.length - 1 || 1)) * 100
        const y = 34 - ((value - min) / range) * 30
        return `${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')
  }, [values])

  return (
    <svg className="sparkline" viewBox="0 0 100 38" role="img" aria-label="7 day price trend">
      <polyline className={positive ? 'positive' : 'negative'} points={points} />
    </svg>
  )
}

function App() {
  const [marketData, setMarketData] = useState<MarketData>({ brl: [], usd: [] })
  const [quoteCurrency, setQuoteCurrency] = useState<QuoteCurrency>('brl')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  async function loadMarketData() {
    setLoading(true)
    setError('')

    try {
      const [brlResponse, usdResponse] = await Promise.all([
        fetch(buildApiUrl('brl')),
        fetch(buildApiUrl('usd')),
      ])

      if (!brlResponse.ok || !usdResponse.ok) {
        throw new Error('A CoinGecko retornou uma falha temporária.')
      }

      const [brl, usd] = (await Promise.all([
        brlResponse.json(),
        usdResponse.json(),
      ])) as [Coin[], Coin[]]

      setMarketData({ brl, usd })
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadMarketData()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const secondaryCurrency: QuoteCurrency = quoteCurrency === 'brl' ? 'usd' : 'brl'
  const coins = marketData[quoteCurrency]
  const secondaryCoinsById = useMemo(() => {
    return new Map(marketData[secondaryCurrency].map((coin) => [coin.id, coin]))
  }, [marketData, secondaryCurrency])

  const filteredCoins = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return coins

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(normalizedQuery) ||
        coin.symbol.toLowerCase().includes(normalizedQuery),
    )
  }, [coins, query])

  const leaders = coins.slice(0, 3)
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0)
  const totalVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0)
  const secondaryTotalMarketCap = marketData[secondaryCurrency].reduce(
    (sum, coin) => sum + coin.market_cap,
    0,
  )
  const secondaryTotalVolume = marketData[secondaryCurrency].reduce(
    (sum, coin) => sum + coin.total_volume,
    0,
  )
  const averageChange =
    coins.reduce((sum, coin) => sum + (coin.price_change_percentage_24h ?? 0), 0) /
    (coins.length || 1)
  const currency = formatters[quoteCurrency].currency
  const compactCurrency = formatters[quoteCurrency].compact
  const secondaryCurrencyFormatter = formatters[secondaryCurrency].currency
  const secondaryCompactCurrency = formatters[secondaryCurrency].compact

  return (
    <main className="dashboard">
      <section className="hero">
        <div>
          <p className="eyebrow">Crypto Market Desk</p>
          <h1>Cotação de Criptomoedas em Tempo Real</h1>
          <p className="hero-copy">
            Acompanhe preços, volume, valor de mercado e variação diária das principais
            moedas em uma tela pronta para evoluir para alertas, carteira e analytics.
          </p>
        </div>

        <div className="hero-actions">
          <div className="currency-toggle" role="group" aria-label="Moeda principal">
            {quoteOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                className={quoteCurrency === option.code ? 'active' : ''}
                onClick={() => setQuoteCurrency(option.code)}
                aria-pressed={quoteCurrency === option.code}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button type="button" className="primary-button" onClick={loadMarketData} disabled={loading}>
            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            Atualizar
          </button>
          <span className="timestamp">
            {lastUpdated ? `Atualizado ${lastUpdated.toLocaleTimeString('pt-BR')}` : 'Aguardando dados'}
          </span>
        </div>
      </section>

      <section className="metrics" aria-label="Resumo do mercado">
        <article>
          <CircleDollarSign size={22} />
          <span>Market cap monitorado</span>
          <div className="metric-value">
            <strong>{compactCurrency.format(totalMarketCap)}</strong>
            <small>{secondaryCompactCurrency.format(secondaryTotalMarketCap)}</small>
          </div>
        </article>
        <article>
          <Activity size={22} />
          <span>Volume 24h</span>
          <div className="metric-value">
            <strong>{compactCurrency.format(totalVolume)}</strong>
            <small>{secondaryCompactCurrency.format(secondaryTotalVolume)}</small>
          </div>
        </article>
        <article>
          <TrendingUp size={22} />
          <span>Variação média 24h</span>
          <strong className={averageChange >= 0 ? 'up' : 'down'}>{formatPercent(averageChange)}</strong>
        </article>
      </section>

      <section className="leaders" aria-label="Principais criptomoedas">
        {leaders.map((coin) => {
          const change = coin.price_change_percentage_24h ?? 0
          const secondaryCoin = secondaryCoinsById.get(coin.id)

          return (
            <article key={coin.id} className="leader-card">
              <div className="coin-title">
                <img src={coin.image} alt="" />
                <div>
                  <strong>{coin.name}</strong>
                  <span>{coin.symbol.toUpperCase()}</span>
                </div>
              </div>
              <div className="leader-price">
                <span>{currency.format(coin.current_price)}</span>
                {secondaryCoin ? (
                  <em>{secondaryCurrencyFormatter.format(secondaryCoin.current_price)}</em>
                ) : null}
                <small className={change >= 0 ? 'up' : 'down'}>
                  {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {formatPercent(change)}
                </small>
              </div>
            </article>
          )
        })}
      </section>

      <section className="market-panel">
        <div className="panel-toolbar">
          <div>
            <h2>Mercado</h2>
            <p>{filteredCoins.length} ativos listados</p>
          </div>
          <label className="search-field">
            <Search size={18} />
            <input
              type="search"
              placeholder="Buscar moeda"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {error ? <div className="status error">Erro ao carregar cotações: {error}</div> : null}
        {loading ? <div className="status">Carregando cotações...</div> : null}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ativo</th>
                <th>Preço</th>
                <th>24h</th>
                <th>Volume</th>
                <th>Market cap</th>
                <th>Tendência 7d</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => {
                const change = coin.price_change_percentage_24h ?? 0
                const secondaryCoin = secondaryCoinsById.get(coin.id)

                return (
                  <tr key={coin.id}>
                    <td>{coin.market_cap_rank}</td>
                    <td>
                      <div className="asset-cell">
                        <img src={coin.image} alt="" />
                        <div>
                          <strong>{coin.name}</strong>
                          <span>{coin.symbol.toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="money-stack">
                        <strong>{currency.format(coin.current_price)}</strong>
                        {secondaryCoin ? (
                          <span>{secondaryCurrencyFormatter.format(secondaryCoin.current_price)}</span>
                        ) : null}
                      </div>
                    </td>
                    <td className={change >= 0 ? 'up' : 'down'}>{formatPercent(change)}</td>
                    <td>
                      <div className="money-stack">
                        <strong>{compactCurrency.format(coin.total_volume)}</strong>
                        {secondaryCoin ? (
                          <span>{secondaryCompactCurrency.format(secondaryCoin.total_volume)}</span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div className="money-stack">
                        <strong>{compactCurrency.format(coin.market_cap)}</strong>
                        {secondaryCoin ? (
                          <span>{secondaryCompactCurrency.format(secondaryCoin.market_cap)}</span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <SparklineChart
                        values={coin.sparkline_in_7d?.price ?? []}
                        positive={change >= 0}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
