# Excel Formula Explorer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive web app that teaches law students Excel text functions through guided demos and sandboxes, styled to look like Excel.

**Architecture:** React SPA with tab-based navigation. Each of 7 function panels has a DemoPanel (spreadsheet grid + step walkthrough) and SandboxPanel (try-it-yourself). All demo data is static JS objects. No backend.

**Tech Stack:** React 18, Vite, Tailwind CSS v4

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`
- Create: `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Step 1: Initialize Vite + React project**

```bash
npm create vite@latest . -- --template react
```

Accept defaults. This creates the scaffolding files.

**Step 2: Install Tailwind CSS**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Configure Tailwind**

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

Update `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

**Step 4: Replace App.jsx with skeleton**

```jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center py-4" style={{ color: '#BA0C2F' }}>
        Excel Formula Explorer
      </h1>
    </div>
  )
}

export default App
```

**Step 5: Verify dev server runs**

```bash
npm run dev
```

Open browser, confirm title renders in scarlet.

**Step 6: Verify production build**

```bash
npm run build
```

Confirm `dist/` folder is produced with no errors.

**Step 7: Commit**

```bash
git init
```

Create `.gitignore`:

```
node_modules
dist
.env
```

```bash
git add .
git commit -m "feat: scaffold Vite + React + Tailwind project"
```

---

### Task 2: Header and Tab Navigation

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/TabNavigation.jsx`
- Modify: `src/App.jsx`

**Step 1: Build Header component**

```jsx
// src/components/Header.jsx
export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold" style={{ color: '#BA0C2F' }}>
          Excel Formula Explorer
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Text Functions for Lawyers — Buckeye Law Group
        </p>
      </div>
    </header>
  )
}
```

**Step 2: Build TabNavigation component**

```jsx
// src/components/TabNavigation.jsx
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
```

**Step 3: Wire up in App.jsx**

```jsx
// src/App.jsx
import { useState } from 'react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto p-6">
        <p className="text-gray-400">Active: {activeTab}</p>
      </main>
    </div>
  )
}

export default App
```

**Step 4: Verify in browser**

Tabs render horizontally. Clicking a tab highlights it in scarlet. Active tab text shows below.

**Step 5: Commit**

```bash
git add src/components/Header.jsx src/components/TabNavigation.jsx src/App.jsx
git commit -m "feat: add header and tab navigation"
```

---

### Task 3: Shared Spreadsheet Components (FormulaBar, SpreadsheetGrid, StepControls, TeachingNote)

**Files:**
- Create: `src/components/FormulaBar.jsx`
- Create: `src/components/SpreadsheetGrid.jsx`
- Create: `src/components/StepControls.jsx`
- Create: `src/components/TeachingNote.jsx`

**Step 1: Build FormulaBar**

```jsx
// src/components/FormulaBar.jsx
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
```

**Step 2: Build SpreadsheetGrid**

This is the core visual component. It renders an Excel-like grid with column letters, row numbers, cell data, and optional highlighting.

Props:
- `columns`: array of `{ header: string, key: string }` — the data columns
- `rows`: array of objects keyed by column keys
- `highlightCells`: array of cell references like `["B2", "C2"]` — these get highlight styling
- `resultColumns`: array of column keys that are "result" columns (green background when visible)
- `showResults`: boolean — whether to show result column values
- `visibleRows`: optional number — how many rows to display (defaults to all)

```jsx
// src/components/SpreadsheetGrid.jsx
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
              {/* row number header - empty */}
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
```

**Step 3: Build StepControls**

```jsx
// src/components/StepControls.jsx
export default function StepControls({ currentStep, totalSteps, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={currentStep <= 1}
        className="px-4 py-2 text-sm font-medium rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </span>
      <button
        onClick={onNext}
        disabled={currentStep >= totalSteps}
        className="px-4 py-2 text-sm font-medium rounded text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#BA0C2F' }}
      >
        Next
      </button>
    </div>
  )
}
```

**Step 4: Build TeachingNote**

```jsx
// src/components/TeachingNote.jsx
export default function TeachingNote({ children }) {
  if (!children) return null
  return (
    <div className="mt-3 p-3 rounded bg-[#fef9e7] border border-yellow-200 text-sm text-gray-700 flex gap-2">
      <span className="text-lg leading-none">💡</span>
      <div>{children}</div>
    </div>
  )
}
```

**Step 5: Verify** — import all four into App.jsx temporarily with dummy data, confirm they render correctly.

**Step 6: Commit**

```bash
git add src/components/FormulaBar.jsx src/components/SpreadsheetGrid.jsx src/components/StepControls.jsx src/components/TeachingNote.jsx
git commit -m "feat: add shared spreadsheet components"
```

---

### Task 4: DemoPanel Wrapper and Home Tab

**Files:**
- Create: `src/components/DemoPanel.jsx`
- Create: `src/panels/HomePanel.jsx`
- Modify: `src/App.jsx`

**Step 1: Build DemoPanel**

DemoPanel is a generic wrapper that takes a panel's data config and renders the FormulaBar, SpreadsheetGrid, explanation, teaching note, and step controls. Each function panel will use this.

```jsx
// src/components/DemoPanel.jsx
import { useState } from 'react'
import FormulaBar from './FormulaBar'
import SpreadsheetGrid from './SpreadsheetGrid'
import StepControls from './StepControls'
import TeachingNote from './TeachingNote'

export default function DemoPanel({ config }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = config.steps[stepIndex]

  // Determine which result columns to show based on steps up to current
  const visibleResults = config.steps
    .slice(0, stepIndex + 1)
    .some(s => s.showResult)

  return (
    <div>
      <FormulaBar formula={step.formula} />
      <SpreadsheetGrid
        columns={config.columns}
        rows={config.rows}
        highlightCells={step.highlight}
        resultColumns={config.resultColumns || []}
        showResults={visibleResults}
      />
      <div className="mt-3 p-3 bg-white rounded border border-gray-200 text-sm text-gray-700">
        {step.explanation}
      </div>
      {step.teachingNote && <TeachingNote>{step.teachingNote}</TeachingNote>}
      <StepControls
        currentStep={stepIndex + 1}
        totalSteps={config.steps.length}
        onPrev={() => setStepIndex(i => Math.max(0, i - 1))}
        onNext={() => setStepIndex(i => Math.min(config.steps.length - 1, i + 1))}
      />
    </div>
  )
}
```

**Step 2: Build HomePanel**

```jsx
// src/panels/HomePanel.jsx
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
```

**Step 3: Update App.jsx** to render HomePanel when `activeTab === 'home'`, placeholder for others.

**Step 4: Verify** — Home tab shows scenario text. Other tabs show placeholder.

**Step 5: Commit**

```bash
git add src/components/DemoPanel.jsx src/panels/HomePanel.jsx src/App.jsx
git commit -m "feat: add DemoPanel wrapper and Home tab"
```

---

### Task 5: TRIM Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/trim.js`
- Create: `src/panels/TrimPanel.jsx`
- Create: `src/components/sandboxes/TrimSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create TRIM data file**

```js
// src/data/trim.js
export const trimConfig = {
  id: 'trim',
  label: 'TRIM',
  columns: [
    { header: 'Case ID', key: 'caseId' },
    { header: 'Opposing Party (messy)', key: 'messy' },
    { header: 'Opposing Party (cleaned)', key: 'cleaned' },
  ],
  resultColumns: ['cleaned'],
  rows: [
    { caseId: 'C-1001', messy: '  Acme Manufacturing, LLC', cleaned: 'Acme Manufacturing, LLC' },
    { caseId: 'C-1005', messy: '  Ohio Department of Job and Family Services  ', cleaned: 'Ohio Department of Job and Family Services' },
    { caseId: 'C-1008', messy: 'ABC Property Management  Inc.', cleaned: 'ABC Property Management Inc.' },
    { caseId: 'C-1011', messy: '  Columbus Metropolitan Housing Authority', cleaned: 'Columbus Metropolitan Housing Authority' },
    { caseId: 'C-1016', messy: 'Progressive Insurance Co.  ', cleaned: 'Progressive Insurance Co.' },
    { caseId: 'C-1017', messy: '  Amazon.com Services LLC  ', cleaned: 'Amazon.com Services LLC' },
  ],
  steps: [
    {
      highlight: ['B2'],
      formula: '',
      explanation: 'Look at the opposing party names in column B. Notice the extra spaces — leading spaces before "Acme," trailing spaces after "Progressive," and double spaces in "ABC Property Management  Inc." These come from data migrated between systems.',
      teachingNote: null,
      showResult: false,
    },
    {
      highlight: ['C2'],
      formula: '=TRIM(B2)',
      explanation: 'Click cell C2. We enter =TRIM(B2) to remove all leading, trailing, and double spaces from the text in B2.',
      teachingNote: null,
      showResult: false,
    },
    {
      highlight: ['B2', 'C2'],
      formula: '=TRIM(B2)',
      explanation: 'The result appears: "Acme Manufacturing, LLC" — clean, with no extra spaces. Compare it to the original in B2.',
      teachingNote: null,
      showResult: true,
    },
    {
      highlight: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
      formula: '=TRIM(B2)',
      explanation: 'Copy the formula down the entire column. Every name is cleaned in one step — no manual editing needed.',
      teachingNote: 'TRIM is your first line of defense whenever data looks "off." Extra spaces cause exact-match lookups to fail, sorting to break, and CONCATENATE to produce ugly results. Always TRIM before doing anything else with imported text.',
      showResult: true,
    },
  ],
}
```

**Step 2: Build TrimSandbox**

```jsx
// src/components/sandboxes/TrimSandbox.jsx
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
```

**Step 3: Build TrimPanel** combining DemoPanel + TrimSandbox

```jsx
// src/panels/TrimPanel.jsx
import DemoPanel from '../components/DemoPanel'
import TrimSandbox from '../components/sandboxes/TrimSandbox'
import { trimConfig } from '../data/trim'

export default function TrimPanel() {
  return (
    <div className="space-y-6">
      <DemoPanel config={trimConfig} />
      <div className="border-t border-gray-200 pt-6">
        <TrimSandbox />
      </div>
    </div>
  )
}
```

**Step 4: Wire TrimPanel into App.jsx** — render when `activeTab === 'trim'`.

**Step 5: Verify** — click TRIM tab, step through demo, try sandbox.

**Step 6: Commit**

```bash
git add src/data/trim.js src/panels/TrimPanel.jsx src/components/sandboxes/TrimSandbox.jsx src/App.jsx
git commit -m "feat: add TRIM panel with demo and sandbox"
```

---

### Task 6: PROPER Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/proper.js`
- Create: `src/panels/ProperPanel.jsx`
- Create: `src/components/sandboxes/ProperSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create PROPER data file**

Use the data from the spec: 6 rows with messy last/first names and fixed versions. Steps: show messy data, apply PROPER(B2), show result, note limitation with "Van Der Berg", show UPPER/LOWER briefly, show combined PROPER(TRIM(C2)).

**Step 2: Build ProperSandbox** — text input, three buttons (PROPER, UPPER, LOWER), result display.

**Step 3: Build ProperPanel** combining DemoPanel + ProperSandbox.

**Step 4: Wire into App.jsx, verify, commit.**

```bash
git commit -m "feat: add PROPER panel with demo and sandbox"
```

---

### Task 7: CONCATENATE Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/concatenate.js`
- Create: `src/panels/ConcatenatePanel.jsx`
- Create: `src/components/sandboxes/ConcatenateSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create CONCATENATE data file**

Use spec data: 4 rows, columns for First, Last, Full Name, Opposing Party, Case Caption. Steps cover & operator, CONCATENATE function, case caption building, TEXTJOIN mention.

**Step 2: Build ConcatenateSandbox** — three text inputs (First, Last, Company), show concatenated results in multiple formats.

**Step 3: Build ConcatenatePanel, wire up, verify, commit.**

```bash
git commit -m "feat: add CONCATENATE panel with demo and sandbox"
```

---

### Task 8: LEFT/MID/RIGHT Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/leftmidright.js`
- Create: `src/panels/LeftMidRightPanel.jsx`
- Create: `src/components/sandboxes/LeftMidRightSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create LEFT/MID/RIGHT data file**

Use spec data: 6 docket numbers. Steps extract district (LEFT), year (MID), judge (RIGHT), case number (MID). Include the character position visual aid as part of step explanations.

**Step 2: Build LeftMidRightSandbox** — text input (pre-populated with a docket number), three modes (LEFT(n), MID(start, length), RIGHT(n)) with number inputs, result display with character positions highlighted.

**Step 3: Build panel, wire up, verify, commit.**

```bash
git commit -m "feat: add LEFT/MID/RIGHT panel with demo and sandbox"
```

---

### Task 9: Flash Fill Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/flashfill.js`
- Create: `src/panels/FlashFillPanel.jsx`
- Create: `src/components/sandboxes/FlashFillSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Flash Fill data file**

Reuse docket numbers from LEFT/MID/RIGHT panel. Steps: show docket numbers, show "ALM" typed in B2, Flash Fill fills remaining cells (stagger animation), show second example with "District 2" pattern.

The step config needs an `animateRows` property for the stagger effect. DemoPanel will need to handle this — either add a generic animation mechanism or handle it in a custom FlashFillDemo component.

**Step 2: Build custom FlashFillDemo** (may need to diverge from DemoPanel since the animation is unique)

This panel can use a custom demo component instead of the generic DemoPanel. It manages its own step state and triggers timed reveals of each row.

**Step 3: Build FlashFillSandbox**

- Source data: pre-loaded docket numbers
- User types one example output in a text input
- Click "Flash Fill"
- App finds the substring position of the user's example in the first source string
- Extracts from the same position in all other source strings
- Reveals results one-by-one with 200ms stagger

```js
// Core logic
function flashFill(sources, example, firstSource) {
  const start = firstSource.indexOf(example)
  if (start === -1) return sources.map(() => '???')
  return sources.map(s => s.substring(start, start + example.length))
}
```

**Step 4: Build FlashFillPanel, wire up, verify, commit.**

```bash
git commit -m "feat: add Flash Fill panel with animated demo and sandbox"
```

---

### Task 10: VLOOKUP Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/vlookup.js`
- Create: `src/panels/VlookupPanel.jsx`
- Create: `src/components/sandboxes/VlookupSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create VLOOKUP data file**

Two tables from the spec: Case List (3 rows) and Attorney Directory (4 rows). Steps: show both tables, click D2, show VLOOKUP formula with color-coded argument highlights, result appears, show hourly rate lookup, mention XLOOKUP.

The config needs two sets of grid data. The DemoPanel may need to be extended or a custom VlookupDemo used to render two grids.

**Step 2: Build custom VlookupDemo** with two SpreadsheetGrid components

Color-coded highlighting: the step config includes `highlightStyles` that map cell refs to colors (blue for lookup value, green for table range, yellow for return column).

**Step 3: Build VlookupSandbox** — dropdown of emails, number input for column, live result from the attorney directory.

**Step 4: Build panel, wire up, verify, commit.**

```bash
git commit -m "feat: add VLOOKUP panel with dual-grid demo and sandbox"
```

---

### Task 11: COUNTIF Cross-Ref Panel (Data + Demo + Sandbox)

**Files:**
- Create: `src/data/countif.js`
- Create: `src/panels/CountifPanel.jsx`
- Create: `src/components/sandboxes/CountifSandbox.jsx`
- Modify: `src/App.jsx`

**Step 1: Create COUNTIF data file**

Two witness lists from the spec. Steps: show both lists, click C2, show IF(COUNTIF(...)) formula, break it down, copy down, show results.

**Step 2: Build custom CountifDemo** — two grids, "BOTH LISTS" badges appear progressively.

**Step 3: Build CountifSandbox** — two text areas (paste a list in each), "Find Overlaps" button, highlights matching items.

**Step 4: Build panel, wire up, verify, commit.**

```bash
git commit -m "feat: add COUNTIF Cross-Ref panel with demo and sandbox"
```

---

### Task 12: Polish and Responsive Layout

**Files:**
- Modify: various component files
- Modify: `src/index.css` (if custom styles needed)

**Step 1: Test all 7 panels** — walk through every step, try every sandbox. Fix any bugs.

**Step 2: Responsive adjustments**
- Tabs: horizontal scroll on small screens (already handled with `overflow-x-auto`)
- Grids: horizontal scroll when columns overflow
- Sandbox inputs: stack vertically on mobile
- Test at laptop width (primary target) and phone width (secondary)

**Step 3: Add keyboard navigation** — Left/Right arrow keys for step navigation within a panel.

**Step 4: Verify production build**

```bash
npm run build && npx serve dist
```

Test the built version in browser.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: polish layout, responsive fixes, keyboard nav"
```

---

### Task 13: Render Deployment Setup

**Files:**
- Create: `render.yaml` (optional, for Render Blueprint)

**Step 1: Create render.yaml** (optional convenience)

```yaml
services:
  - type: web
    name: excel-formula-explorer
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
```

**Step 2: Push to GitHub**

```bash
git remote add origin <repo-url>
git push -u origin main
```

**Step 3: Create Render Static Site**
- Connect GitHub repo
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Deploy

**Step 4: Verify live site loads and all panels work.**

**Step 5: Commit render.yaml if created**

```bash
git add render.yaml
git commit -m "chore: add Render deployment config"
```
