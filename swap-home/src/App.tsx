import { useMemo, useState } from 'react'

type Token = {
  symbol: string
  name: string
  address: string
}

const TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' },
  { symbol: 'USDC', name: 'USD Coin', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { symbol: 'DAI', name: 'Dai', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
]

function App() {
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0])
  const [toToken, setToToken] = useState<Token>(TOKENS[1])
  const [fromAmount, setFromAmount] = useState<string>('')

  const rate = 3000 // placeholder
  const estimated = useMemo(() => {
    const value = Number(fromAmount)
    if (!isFinite(value) || value <= 0) return ''
    return (value * rate).toLocaleString()
  }, [fromAmount])

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-8 rounded bg-brand" />
            <span className="text-lg font-semibold tracking-tight">SwapX</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 text-sm rounded-md bg-white/5 hover:bg-white/10 transition">Docs</button>
            <button className="px-4 py-2 text-sm rounded-md bg-brand hover:brightness-110 transition font-medium">Connect Wallet</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-16 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Swap crypto instantly with ultra-low slippage
            </h1>
            <p className="mt-4 text-white/70 max-w-prose">
              A sleek, gas-efficient swap experience. Connect your wallet and trade tokens
              at the best available rates. Your brand color powers the UI.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="px-5 py-3 rounded-md bg-brand text-white font-medium hover:brightness-110 transition">Start Swapping</button>
              <button className="px-5 py-3 rounded-md bg-white/5 hover:bg-white/10 transition">Learn more</button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand" /> Aggregated liquidity</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand" /> MEV protection</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand" /> On-chain routing</div>
            </div>
          </div>

          <div>
            <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-2xl">
              <div className="text-sm text-white/60 mb-2">Swap</div>
              <div className="space-y-4">
                <div className="rounded-xl bg-neutral-900 border border-white/10 p-4">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>From</span>
                    <span>Balance: 0.00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      className="bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                      value={fromToken.symbol}
                      onChange={(e) => setFromToken(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[0])}
                    >
                      {TOKENS.map(t => (
                        <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
                      ))}
                    </select>
                    <input
                      inputMode="decimal"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 hover:bg-neutral-800 transition"
                    onClick={() => {
                      setFromToken(toToken)
                      setToToken(fromToken)
                    }}
                  >
                    <span className="i-[flip]" />
                    <span className="text-sm">Swap</span>
                  </button>
                </div>

                <div className="rounded-xl bg-neutral-900 border border-white/10 p-4">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>To</span>
                    <span>Balance: 0.00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      className="bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                      value={toToken.symbol}
                      onChange={(e) => setToToken(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[1])}
                    >
                      {TOKENS.map(t => (
                        <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
                      ))}
                    </select>
                    <input
                      readOnly
                      value={estimated}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-neutral-900 border border-white/10 p-3 text-sm text-white/70">
                  <div className="flex items-center justify-between"><span>Rate</span><span>1 {fromToken.symbol} ≈ {rate.toLocaleString()} {toToken.symbol}</span></div>
                  <div className="flex items-center justify-between"><span>Slippage</span><span>0.5%</span></div>
                </div>

                <button className="w-full py-3 rounded-xl bg-brand hover:brightness-110 transition font-semibold">Connect Wallet</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-white/50">
        Built with <span className="text-brand font-semibold">Tailwind</span> + React
      </footer>
    </div>
  )
}

export default App
