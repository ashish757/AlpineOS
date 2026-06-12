import  { useState, type KeyboardEvent } from 'react'

export const BrowserApp = () => {
  const [inp, setInp] = useState('https://www.wikipedia.org')
  const [src, setSrc] = useState('https://www.wikipedia.org')
  const [hist, setHist] = useState<string[]>(['https://www.wikipedia.org'])
  const [pos, setPos] = useState(0)

  const nav = (newSrc: string) => {
    let tSrc = newSrc
    if (!tSrc.startsWith('http://') && !tSrc.startsWith('https://')) {
      tSrc = 'https://' + tSrc
    }
    setSrc(tSrc)
    setInp(tSrc)
    setHist(p => {
      const nHist = p.slice(0, pos + 1)
      nHist.push(tSrc)
      return nHist
    })
    setPos(p => p + 1)
  }

  const hndlKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      nav(inp)
    }
  }

  const goBack = () => {
    if (pos > 0) {
      setPos(p => p - 1)
      setSrc(hist[pos - 1])
      setInp(hist[pos - 1])
    }
  }

  const goFwd = () => {
    if (pos < hist.length - 1) {
      setPos(p => p + 1)
      setSrc(hist[pos + 1])
      setInp(hist[pos + 1])
    }
  }

  const reload = () => {
    const curr = src
    setSrc('')
    setTimeout(() => setSrc(curr), 10)
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#1c1c1e] font-sans">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#252526] px-2 py-1.5 shadow-sm">
        <button onClick={goBack} disabled={pos === 0} className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${pos === 0 ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}>
           <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={goFwd} disabled={pos === hist.length - 1} className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${pos === hist.length - 1 ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}>
           <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <button onClick={reload} className="flex h-6 w-6 items-center justify-center rounded text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </button>
        
        <input
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={hndlKey}
          className="flex-1 rounded bg-[#1e1e1e] px-3 py-1 text-xs text-slate-200 outline-none border border-transparent focus:border-blue-500/50"
        />
      </div>
      
      <div className="flex-1 bg-white">
        <iframe 
          src={src} 
          className="h-full w-full border-none bg-white"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          title="browser"
        />
      </div>
    </div>
  )
}