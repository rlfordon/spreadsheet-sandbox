import { useState } from 'react'

const EXAMPLE_TEXT = '  Buckeye Law Group   is the best  '

export default function TrimSandbox() {
  const [input, setInput] = useState(EXAMPLE_TEXT)
  const [result, setResult] = useState(null)

  const applyTrim = () => {
    setResult(input.replace(/\s+/g, ' ').trim())
  }

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 font-mono text-sm h-20 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Paste text with extra spaces..."
      />
      <div className="flex gap-3 items-center mt-2">
        <button
          onClick={applyTrim}
          className="px-4 py-2 text-sm font-medium rounded text-white"
          style={{ backgroundColor: '#BA0C2F' }}
        >
          Apply TRIM
        </button>
        {input && result !== null && (
          <span className="text-xs text-gray-400">
            {input.length} chars → {result.length} chars
          </span>
        )}
      </div>
      {result !== null && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded font-mono text-sm">
          {result}
        </div>
      )}
    </div>
  )
}
