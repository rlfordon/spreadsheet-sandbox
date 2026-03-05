# Excel Formula Explorer

An interactive web app that teaches law students Excel text functions through guided demos and hands-on sandboxes. Built for the 21st Century Lawyering course at Ohio State Moritz College of Law.

**Live site:** https://spreadsheet-sandbox.onrender.com

## What It Does

Students work through a fictional scenario — cleaning up messy case data after a law firm merger — using seven Excel functions:

| Function | What Students Learn |
|----------|-------------------|
| **TRIM** | Remove extra spaces from imported data |
| **PROPER** | Fix inconsistent capitalization (+ UPPER, LOWER) |
| **CONCATENATE** | Build full names, case captions, and merge fields |
| **LEFT / MID / RIGHT** | Parse docket numbers to extract district, year, judge |
| **Flash Fill** | Pattern recognition for quick extraction without formulas |
| **VLOOKUP** | Look up attorney names from email addresses across tables |
| **COUNTIF Cross-Ref** | Find which witnesses appear on both plaintiff and defense lists |

Each function has a **step-by-step demo** (with an Excel-like grid, formula bar, and cell highlighting) and a **sandbox** where students can try it themselves with their own data.

## Usage

The app is designed for two contexts:

- **In class:** Professor clicks through the demos on a projector — no live Excel fumbling
- **After class:** Students revisit any function tab as a reference

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- No backend — everything runs client-side

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces a static site in `dist/`.
