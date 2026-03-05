# Excel Formula Explorer -- Design

## Tech Stack
- React 18 + Vite -- fast dev, static build output
- Tailwind CSS -- utility-first styling, OSU scarlet/Excel color scheme
- No other dependencies -- React state + context is sufficient

## Component Architecture

```
App
  Header (logo, title, subtitle)
  TabNavigation (horizontal tabs: Home, TRIM, PROPER, CONCATENATE, LEFT/MID/RIGHT, Flash Fill, VLOOKUP, COUNTIF)
  TabPanel (one per function)
    DemoPanel (~60% height)
      FormulaBar (fx icon + formula display)
      SpreadsheetGrid (column headers, row numbers, cells, highlighting)
      StepExplanation (1-2 sentence explanation card)
      TeachingNote (callout box, shown on relevant steps)
      StepControls (Previous / Next + step indicator)
    SandboxPanel (~40% height)
      Input area(s) -- varies per function
      Apply button(s)
      Result display
```

## Shared Components

- **SpreadsheetGrid** -- reusable across all 7 panels. Takes column definitions, row data, and highlight config as props. Renders Excel-style with row numbers, column letters, gridlines. Highlighted cells get colored borders/backgrounds matching Excel's formula-editing colors (blue, green, purple).
- **FormulaBar** -- gray background, monospace font, "fx" label. Receives the current formula string as a prop.
- **StepControls** -- Previous/Next buttons, step counter. Manages which step is active within each panel.
- **TeachingNote** -- light yellow callout box with lightbulb icon.

## Data Architecture

Each function panel is defined as a data object:

```js
{
  id: "trim",
  label: "TRIM",
  columns: ["Case ID", "Opposing Party (messy)", "Opposing Party (cleaned)"],
  rows: [ /* 6 rows of data */ ],
  steps: [
    {
      highlight: ["B2"],
      formula: "=TRIM(B2)",
      explanation: "Notice the extra spaces...",
      teachingNote: null,
      showResult: false,
    },
    // ... more steps
  ],
  sandbox: { type: "trim", /* sandbox-specific config */ }
}
```

All demo data lives in `/src/data/`, one file per panel. No fetching -- bundled.

## Step Walkthrough Behavior

- Each panel starts at step 1. Cells in `highlight` get a colored border.
- Formula bar updates to show the current step's formula.
- When `showResult` flips to true, result cell fades in (CSS transition).
- Before/After toggle: button that toggles visibility of result columns.

## Flash Fill Panel

- **Demo:** Step-by-step animation. Show docket numbers, animate "ALM" typed into B2, then Flash Fill activates with 200ms stagger delay filling remaining cells.
- **Sandbox:** User picks source column (docket numbers pre-loaded), types one example output, clicks "Flash Fill." App finds substring position in first row, extracts from same position in others, displays row-by-row with stagger effect.

## VLOOKUP Panel

- Two grids (Case List + Attorney Directory), stacked or side-by-side.
- Color-coded argument highlighting: lookup value blue, table range green, return column yellow.
- Sandbox: dropdown for email, number input for column, live result.

## COUNTIF Panel

- Two grids (Plaintiff list + Defense list).
- Steps progressively fill "On Defense List?" column with "BOTH LISTS" badges.
- Sandbox: two text areas, paste lists, click "Find Overlaps," matches highlighted.

## Visual Design

- Accent: OSU scarlet #BA0C2F for header, active tab, primary buttons
- Grid: white cells, #e0e0e0 gridlines, #d4e6f1 selected cell highlight, #d5f5e3 result cells
- Formula bar: #f0f0f0 background, monospace font
- Teaching notes: #fef9e7 background, lightbulb icon
- Fonts: system sans-serif for UI, monospace for formulas/data

## Render Deployment

`vite build` produces `dist/`. On Render: Static Site, build command `npm run build`, publish directory `dist`.
