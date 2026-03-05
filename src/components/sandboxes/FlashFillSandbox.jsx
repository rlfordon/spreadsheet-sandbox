import { useState, useEffect } from 'react'
import { flashFillDockets } from '../../data/flashfill'

function findPattern(source, example) {
  // Try substring match first
  const start = source.indexOf(example)
  if (start !== -1) {
    return { type: 'substring', start, length: example.length }
  }
  // Try prefix + extraction (e.g., "District 2" from "2:25-cv...")
  // Check if example ends with a substring of source
  for (let i = example.length - 1; i >= 1; i--) {
    const suffix = example.substring(i)
    const idx = source.indexOf(suffix)
    if (idx !== -1) {
      const prefix = example.substring(0, i)
      return { type: 'prefix', prefix, start: idx, length: suffix.length }
    }
  }
  return null
}

function applyPattern(pattern, source) {
  if (!pattern) return '???'
  if (pattern.type === 'substring') {
    return source.substring(pattern.start, pattern.start + pattern.length)
  }
  if (pattern.type === 'prefix') {
    return pattern.prefix + source.substring(pattern.start, pattern.start + pattern.length)
  }
  return '???'
}

export default function FlashFillSandbox() {
  const [example, setExample] = useState('')
  const [results, setResults] = useState([])
  const [visibleCount, setVisibleCount] = useState(0)

  const doFlashFill = () => {
    const pattern = findPattern(flashFillDockets[0], example)
    const filled = flashFillDockets.map(d => applyPattern(pattern, d))
    setResults(filled)
    setVisibleCount(0)
  }

  // Stagger animation for results
  useEffect(() => {
    if (results.length === 0) return
    let count = 0
    const interval = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= results.length) clearInterval(interval)
    }, 200)
    return () => clearInterval(interval)
  }, [results])

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <p className="text-sm text-gray-500 mb-3">
        Type what you want to extract from the first docket number ({flashFillDockets[0]}), then click Flash Fill.
      </p>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={example}
          onChange={e => { setExample(e.target.value); setResults([]) }}
          className="flex-1 border border-gray-300 rounded p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder='e.g., "ALM" or "District 2"'
        />
        <button
          onClick={doFlashFill}
          disabled={!example}
          className="px-4 py-2 text-sm font-medium rounded text-white disabled:opacity-40"
          style={{ backgroundColor: '#BA0C2F' }}
        >
          Flash Fill
        </button>
      </div>

      {results.length > 0 && (
        <div className="border border-gray-400 rounded-sm overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300">Source</th>
                <th className="px-3 py-1.5 text-left font-semibold border-b border-gray-300">Result</th>
              </tr>
            </thead>
            <tbody>
              {flashFillDockets.map((docket, i) => (
                <tr key={i}>
                  <td className="px-3 py-1.5 border-r border-b border-gray-200 font-mono bg-white">{docket}</td>
                  <td className={`px-3 py-1.5 border-b border-gray-200 font-mono transition-all duration-300 ${
                    i < visibleCount ? 'bg-green-50' : 'bg-white'
                  }`}>
                    {i < visibleCount ? results[i] : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
