import { useState } from 'react'
import { attorneyDirectory } from '../../data/vlookup'

const columnOptions = [
  { num: 1, label: 'Email' },
  { num: 2, label: 'Full Name' },
  { num: 3, label: 'Bar Number' },
  { num: 4, label: 'Office' },
  { num: 5, label: 'Hourly Rate' },
]

const colKeys = ['email', 'name', 'bar', 'office', 'rate']

export default function VlookupSandbox() {
  const [lookupEmail, setLookupEmail] = useState(attorneyDirectory[0].email)
  const [colNum, setColNum] = useState(2)

  const found = attorneyDirectory.find(a => a.email === lookupEmail)
  const result = found ? found[colKeys[colNum - 1]] : '#N/A'
  const formula = `=VLOOKUP("${lookupEmail}", [Attorney Directory], ${colNum}, FALSE)`

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <div className="flex gap-3 mb-3 flex-wrap">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Lookup Value (email)</label>
          <select
            value={lookupEmail}
            onChange={e => setLookupEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {attorneyDirectory.map(a => (
              <option key={a.email} value={a.email}>{a.email}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Return Column</label>
          <select
            value={colNum}
            onChange={e => setColNum(Number(e.target.value))}
            className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {columnOptions.map(opt => (
              <option key={opt.num} value={opt.num}>{opt.num} — {opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-3 bg-green-50 border border-green-200 rounded font-mono text-sm">
        <span className="text-xs text-gray-400 block mb-1">{formula}</span>
        <span className="font-bold">{result}</span>
      </div>
    </div>
  )
}
