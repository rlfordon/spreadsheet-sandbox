export default function FormulaBar({ formula }) {
  return (
    <div className="flex items-center border border-gray-300 bg-[#f0f0f0] rounded-sm mb-2">
      <span className="px-3 py-1.5 text-sm font-bold italic text-gray-500 border-r border-gray-300">
        fx
      </span>
      <div className="px-3 py-1.5 font-mono text-sm flex-1">
        {formula || '\u00A0'}
      </div>
    </div>
  )
}
