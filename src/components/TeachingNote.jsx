export default function TeachingNote({ children }) {
  if (!children) return null
  return (
    <div className="mt-3 p-3 rounded bg-[#fef9e7] border border-yellow-200 text-sm text-gray-700 flex gap-2">
      <span className="text-lg leading-none">💡</span>
      <div>{children}</div>
    </div>
  )
}
