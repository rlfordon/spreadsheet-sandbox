const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'trim', label: 'TRIM' },
  { id: 'proper', label: 'PROPER' },
  { id: 'concatenate', label: 'CONCATENATE' },
  { id: 'leftmidright', label: 'LEFT / MID / RIGHT' },
  { id: 'flashfill', label: 'Flash Fill' },
  { id: 'vlookup', label: 'VLOOKUP' },
  { id: 'countif', label: 'COUNTIF Cross-Ref' },
]

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6">
      <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#BA0C2F] text-[#BA0C2F]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
