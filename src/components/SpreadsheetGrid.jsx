const COL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function cellIsHighlighted(colIndex, rowIndex, highlightCells) {
  if (!highlightCells) return false
  const cellRef = `${COL_LETTERS[colIndex]}${rowIndex + 2}` // +2 because row 1 is header
  return highlightCells.includes(cellRef)
}

function cellRangeIsHighlighted(colIndex, rowIndex, highlightCells) {
  if (!highlightCells) return false
  return highlightCells.some(ref => {
    if (!ref.includes(':')) return false
    const [start, end] = ref.split(':')
    const startCol = start.charCodeAt(0) - 65
    const startRow = parseInt(start.slice(1)) - 2
    const endCol = end.charCodeAt(0) - 65
    const endRow = parseInt(end.slice(1)) - 2
    return colIndex >= startCol && colIndex <= endCol && rowIndex >= startRow && rowIndex <= endRow
  })
}

export default function SpreadsheetGrid({
  columns,
  rows,
  highlightCells = [],
  resultColumns = [],
  showResults = false,
}) {
  return (
    <div className="border border-gray-400 rounded-sm overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-10 px-2 py-1.5 text-center text-xs text-gray-500 border-r border-b border-gray-300">
            </th>
            {columns.map((col, i) => (
              <th
                key={col.key}
                className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300 bg-gray-100"
              >
                <span className="text-xs text-gray-400 mr-2">{COL_LETTERS[i]}</span>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="px-2 py-1.5 text-center text-xs text-gray-400 bg-gray-50 border-r border-b border-gray-200">
                {rowIdx + 2}
              </td>
              {columns.map((col, colIdx) => {
                const isHighlighted = cellIsHighlighted(colIdx, rowIdx, highlightCells)
                  || cellRangeIsHighlighted(colIdx, rowIdx, highlightCells)
                const isResult = resultColumns.includes(col.key)
                const showValue = !isResult || showResults

                return (
                  <td
                    key={col.key}
                    className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono whitespace-pre transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset'
                        : isResult && showResults
                          ? 'bg-green-50'
                          : 'bg-white'
                    }`}
                  >
                    {showValue ? row[col.key] : ''}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
