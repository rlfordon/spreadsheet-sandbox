import { useState } from 'react'

export default function ConcatenateSandbox() {
  const [first, setFirst] = useState('Maria')
  const [last, setLast] = useState('Johnson')
  const [company, setCompany] = useState('Acme Manufacturing, LLC')

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Try It Yourself</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">First Name</label>
          <input
            type="text"
            value={first}
            onChange={e => setFirst(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Last Name</label>
          <input
            type="text"
            value={last}
            onChange={e => setLast(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Company</label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="p-2 bg-green-50 border border-green-200 rounded font-mono text-sm">
          <span className="text-xs text-gray-400">First Last → </span>
          {first} {last}
        </div>
        <div className="p-2 bg-green-50 border border-green-200 rounded font-mono text-sm">
          <span className="text-xs text-gray-400">Last, First → </span>
          {last}, {first}
        </div>
        <div className="p-2 bg-green-50 border border-green-200 rounded font-mono text-sm">
          <span className="text-xs text-gray-400">Last v. Company → </span>
          {last} v. {company}
        </div>
      </div>
    </div>
  )
}
