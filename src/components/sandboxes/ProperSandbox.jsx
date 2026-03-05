import { useState } from 'react'

const EXAMPLE_TEXT = 'MARIA JOHNSON-SMITH'

function toProper(str) {
  return str.replace(/\w\S*/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

export default function ProperSandbox() {
  const [input, setInput] = useState(EXAMPLE_TEXT)
  const [result, setResult] = useState(null)
  const [appliedFn, setAppliedFn] = useState('')

  const apply = (fn, label) => {
    setResult(fn(input))
    setAppliedFn(label)
  }

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Type a name in any case..."
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => apply(toProper, 'PROPER')}
          className="px-4 py-2 text-sm font-medium rounded text-white"
          style={{ backgroundColor: '#BA0C2F' }}
        >
          Apply PROPER
        </button>
        <button
          onClick={() => apply(s => s.toUpperCase(), 'UPPER')}
          className="px-4 py-2 text-sm font-medium rounded bg-gray-600 text-white hover:bg-gray-700"
        >
          Apply UPPER
        </button>
        <button
          onClick={() => apply(s => s.toLowerCase(), 'LOWER')}
          className="px-4 py-2 text-sm font-medium rounded bg-gray-600 text-white hover:bg-gray-700"
        >
          Apply LOWER
        </button>
      </div>
      {result !== null && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded font-mono text-sm">
          <span className="text-xs text-gray-400 block mb-1">={appliedFn}("{input}")</span>
          {result}
        </div>
      )}
    </div>
  )
}
