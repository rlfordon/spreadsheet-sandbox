import { useState } from 'react'

const EXAMPLE = '2:25-cv-00341-ALM'

export default function LeftMidRightSandbox() {
  const [input, setInput] = useState(EXAMPLE)
  const [mode, setMode] = useState('left') // 'left', 'mid', 'right'
  const [leftN, setLeftN] = useState(1)
  const [midStart, setMidStart] = useState(3)
  const [midLen, setMidLen] = useState(2)
  const [rightN, setRightN] = useState(3)

  let result = ''
  let highlightStart = 0
  let highlightEnd = 0

  if (mode === 'left') {
    result = input.substring(0, leftN)
    highlightStart = 0
    highlightEnd = leftN
  } else if (mode === 'mid') {
    result = input.substring(midStart - 1, midStart - 1 + midLen)
    highlightStart = midStart - 1
    highlightEnd = midStart - 1 + midLen
  } else {
    result = input.substring(input.length - rightN)
    highlightStart = input.length - rightN
    highlightEnd = input.length
  }

  const formula = mode === 'left'
    ? `=LEFT("${input}", ${leftN})`
    : mode === 'mid'
      ? `=MID("${input}", ${midStart}, ${midLen})`
      : `=RIGHT("${input}", ${rightN})`

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 font-mono text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Type or paste text..."
      />

      {/* Character position visualization */}
      <div className="mb-3 overflow-x-auto">
        <div className="flex font-mono text-xs">
          {input.split('').map((char, i) => (
            <div key={i} className="flex flex-col items-center" style={{ minWidth: '1.5rem' }}>
              <span className="text-gray-400">{i + 1}</span>
              <span className={`px-1 py-0.5 ${
                i >= highlightStart && i < highlightEnd
                  ? 'bg-blue-200 font-bold'
                  : ''
              }`}>
                {char}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mode buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('left')}
          className={`px-4 py-2 text-sm font-medium rounded ${
            mode === 'left' ? 'text-white' : 'bg-gray-200 text-gray-700'
          }`}
          style={mode === 'left' ? { backgroundColor: '#BA0C2F' } : {}}
        >
          LEFT
        </button>
        <button
          onClick={() => setMode('mid')}
          className={`px-4 py-2 text-sm font-medium rounded ${
            mode === 'mid' ? 'text-white' : 'bg-gray-200 text-gray-700'
          }`}
          style={mode === 'mid' ? { backgroundColor: '#BA0C2F' } : {}}
        >
          MID
        </button>
        <button
          onClick={() => setMode('right')}
          className={`px-4 py-2 text-sm font-medium rounded ${
            mode === 'right' ? 'text-white' : 'bg-gray-200 text-gray-700'
          }`}
          style={mode === 'right' ? { backgroundColor: '#BA0C2F' } : {}}
        >
          RIGHT
        </button>
      </div>

      {/* Parameter inputs */}
      <div className="flex gap-3 items-center mb-3">
        {mode === 'left' && (
          <label className="text-sm text-gray-600 flex items-center gap-2">
            Number of characters:
            <input type="number" min={1} max={input.length} value={leftN} onChange={e => setLeftN(Number(e.target.value))}
              className="w-16 border border-gray-300 rounded p-1 text-sm font-mono" />
          </label>
        )}
        {mode === 'mid' && (
          <>
            <label className="text-sm text-gray-600 flex items-center gap-2">
              Start position:
              <input type="number" min={1} max={input.length} value={midStart} onChange={e => setMidStart(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded p-1 text-sm font-mono" />
            </label>
            <label className="text-sm text-gray-600 flex items-center gap-2">
              Length:
              <input type="number" min={1} max={input.length} value={midLen} onChange={e => setMidLen(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded p-1 text-sm font-mono" />
            </label>
          </>
        )}
        {mode === 'right' && (
          <label className="text-sm text-gray-600 flex items-center gap-2">
            Number of characters:
            <input type="number" min={1} max={input.length} value={rightN} onChange={e => setRightN(Number(e.target.value))}
              className="w-16 border border-gray-300 rounded p-1 text-sm font-mono" />
          </label>
        )}
      </div>

      {/* Result */}
      <div className="p-3 bg-green-50 border border-green-200 rounded font-mono text-sm">
        <span className="text-xs text-gray-400 block mb-1">{formula}</span>
        <span className="font-bold">{result}</span>
      </div>
    </div>
  )
}
