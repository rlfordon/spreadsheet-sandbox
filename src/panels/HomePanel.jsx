export default function HomePanel() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4" style={{ color: '#BA0C2F' }}>
        Scenario: Cleaning Up After a Merger
      </h2>
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-gray-700 leading-relaxed space-y-4">
        <p>
          Buckeye Law Group just merged with a smaller firm. Their case data has been combined
          into a single spreadsheet — but it's a mess. Names are in ALL CAPS or all lowercase.
          There are extra spaces everywhere. The docket numbers contain useful information
          (district, year, judge) but it's all crammed into one cell. And the case list only has
          attorney email addresses, not their names.
        </p>
        <p>
          Your supervising partner has a client meeting tomorrow and needs this data cleaned up.
          You could fix each cell by hand... or you could use formulas.
        </p>
        <p className="font-semibold">
          Work through each tab to learn the formulas that will clean this data in seconds
          instead of hours.
        </p>
      </div>
    </div>
  )
}
