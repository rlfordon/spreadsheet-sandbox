import { useState } from 'react'

const DEFAULT_LIST_A = `Dr. Sarah Mitchell
Dr. Raj Gupta
Angela Washington-Cole
Robert Kim
Maria Johnson
Wei Chen`

const DEFAULT_LIST_B = `Dr. Michael Torres
Dr. Raj Gupta
Officer James Miller
Robert Kim
Angela Washington-Cole
Wei Chen`

export default function CountifSandbox() {
  const [listA, setListA] = useState(DEFAULT_LIST_A)
  const [listB, setListB] = useState(DEFAULT_LIST_B)
  const [overlaps, setOverlaps] = useState(null)

  const findOverlaps = () => {
    const a = listA.split('\n').map(s => s.trim()).filter(Boolean)
    const b = listB.split('\n').map(s => s.trim()).filter(Boolean)
    const bSet = new Set(b.map(s => s.toLowerCase()))
    const matches = a.filter(item => bSet.has(item.toLowerCase()))
    setOverlaps(matches)
  }

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <p className="text-sm text-gray-500 mb-3">
        Paste two lists and find which items appear in both.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">List A (one item per line)</label>
          <textarea
            value={listA}
            onChange={e => { setListA(e.target.value); setOverlaps(null) }}
            className="w-full border border-gray-300 rounded p-2 font-mono text-sm h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">List B (one item per line)</label>
          <textarea
            value={listB}
            onChange={e => { setListB(e.target.value); setOverlaps(null) }}
            className="w-full border border-gray-300 rounded p-2 font-mono text-sm h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <button
        onClick={findOverlaps}
        className="px-4 py-2 text-sm font-medium rounded text-white mb-3"
        style={{ backgroundColor: '#BA0C2F' }}
      >
        Find Overlaps
      </button>
      {overlaps !== null && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
          {overlaps.length === 0 ? (
            <p className="text-gray-500">No overlapping items found.</p>
          ) : (
            <>
              <p className="font-semibold mb-2">{overlaps.length} item{overlaps.length !== 1 ? 's' : ''} on both lists:</p>
              <ul className="space-y-1">
                {overlaps.map((item, i) => (
                  <li key={i} className="font-mono">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded mr-2">BOTH</span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}
