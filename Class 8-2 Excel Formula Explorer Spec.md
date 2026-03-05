# Excel Formula Explorer — App Spec

## Overview

An interactive web app that teaches law students Excel text functions they didn't learn in their Procertas Excel training module. The app looks and feels like Excel — with a spreadsheet grid, formula bar, and cell selection — but is actually a guided tutorial with an interactive sandbox.

**Primary use case:** Professor walks through the demos in class (click-through, no live Excel fumbling). Students can revisit the app later as a reference.

**Audience:** Law students with basic Excel skills (they've done Procertas: sort, filter, formulas, PivotTables) but no experience with text manipulation functions.

**Context:** This is for a legal technology course at Ohio State Moritz College of Law. The scenario is a fictional law firm ("Buckeye Law Group") that just merged with a smaller firm. The case data is messy and needs cleaning.

---

## Architecture

- **Single-page web app** — no backend, no API keys, no login
- **Tech:** React (or vanilla HTML/CSS/JS), Tailwind CSS for styling
- **Hosting:** Static site (Replit, Render, Vercel, or similar)
- **No real Excel engine** — formulas are simulated with JavaScript string functions
- **Responsive** but primarily designed for laptop screens (students follow along in class on their own devices)

---

## Layout

### Global Structure

```
+----------------------------------------------------------+
|  Header: "Excel Formula Explorer" + Buckeye Law logo     |
|  Subtitle: "Text Functions for Lawyers"                  |
+----------------------------------------------------------+
|  Function Navigation (horizontal tabs or sidebar)         |
|  [TRIM] [PROPER] [CONCATENATE] [LEFT/MID] [Flash Fill]  |
|  [VLOOKUP] [COUNTIF Cross-Ref]                           |
+----------------------------------------------------------+
|                                                           |
|  DEMO PANEL (top ~60% of screen)                         |
|  Spreadsheet grid + formula bar + step-by-step walkthru  |
|                                                           |
+----------------------------------------------------------+
|                                                           |
|  SANDBOX PANEL (bottom ~40% of screen)                   |
|  "Try it yourself" — paste text, apply formula, see      |
|  result                                                   |
|                                                           |
+----------------------------------------------------------+
```

---

## Demo Panel Design

This is the core of the app. It should **look like Excel** — not be Excel, but evoke it strongly enough that students recognize what they're seeing.

### Visual Elements

1. **Formula bar** — a text input area at the top of the grid showing the formula for the selected cell. Gray background, monospace font. Shows `=PROPER(TRIM(C2))` etc. The formula bar should be clearly labeled with an "fx" icon, just like Excel.

2. **Spreadsheet grid** — column headers (A, B, C...), row numbers (1, 2, 3...), cells with borders. Header row is bold with a dark background. The grid should show real data from the scenario (see Data section below).

3. **Cell highlighting** — when a step references a cell or range, that cell/range gets a colored highlight (like Excel's blue/green/purple range highlighting when editing a formula).

4. **Step-by-step controls** — "Previous" and "Next" buttons below the grid. A step indicator ("Step 3 of 6"). Each step:
   - Highlights the relevant cell(s)
   - Shows the formula appearing in the formula bar
   - Shows a text explanation below the grid ("We're using TRIM to remove the extra spaces from the opposing party name")
   - Optionally animates the result appearing in the output cell

5. **Before/After toggle** — a toggle or button that shows the column before and after the formula is applied, so students can see the transformation.

### What NOT to build
- Don't allow free-form cell editing in the demo grid — it's a guided walkthrough, not a real spreadsheet
- Don't try to implement actual Excel formula parsing — use JavaScript to simulate the results
- Don't make the grid scrollable with hundreds of rows — show 6-8 rows of sample data per demo, enough to see the pattern

---

## Functions to Cover (7 panels)

Each function gets its own tab/panel with a demo walkthrough and sandbox.

### 1. TRIM
- **What it does:** Removes leading, trailing, and double spaces
- **Why lawyers need it:** Data migrated from other systems, copy-pasted from PDFs, or imported from courts often has junk spacing
- **Demo data (show ~6 rows):**

| Row | A (Case ID) | B (Opposing Party - messy) | C (Opposing Party - cleaned) |
|-----|-------------|---------------------------|------------------------------|
| 1 | C-1001 | `  Acme Manufacturing, LLC` | `Acme Manufacturing, LLC` |
| 2 | C-1005 | `  Ohio Department of Job and Family Services  ` | `Ohio Department of Job and Family Services` |
| 3 | C-1008 | `ABC Property Management  Inc.` | `ABC Property Management Inc.` |
| 4 | C-1011 | `  Columbus Metropolitan Housing Authority` | `Columbus Metropolitan Housing Authority` |
| 5 | C-1016 | `Progressive Insurance Co.  ` | `Progressive Insurance Co.` |
| 6 | C-1017 | `  Amazon.com Services LLC  ` | `Amazon.com Services LLC` |

- **Steps:**
  1. Show the messy data. Highlight cell B2. Point out the leading spaces (maybe with a visual indicator like dots or arrows for whitespace).
  2. Click cell C2. Formula bar shows `=TRIM(B2)`.
  3. Result appears: cleaned text. Highlight the difference.
  4. Show the formula copied down the column (all rows cleaned).
- **Sandbox:** Text input box. Paste any text with extra spaces. Click "Apply TRIM." See the cleaned result. Show a character count before/after so they can see the spaces were actually removed.

### 2. PROPER (+ UPPER, LOWER)
- **What it does:** Capitalizes the first letter of each word. Also show UPPER (all caps) and LOWER (all lowercase) briefly.
- **Why lawyers need it:** Names imported from different systems come in ALL CAPS, all lowercase, or mixed. Court filing systems especially love ALL CAPS.
- **Demo data:**

| Row | A (Case ID) | B (Last Name - messy) | C (First Name - messy) | D (Last - fixed) | E (First - fixed) |
|-----|-------------|----------------------|----------------------|-------------------|-------------------|
| 1 | C-1001 | `JOHNSON` | `maria` | `Johnson` | `Maria` |
| 2 | C-1002 | `garcia` | `ROBERTO` | `Garcia` | `Roberto` |
| 3 | C-1004 | `WASHINGTON-COLE` | `denise` | `Washington-Cole` | `Denise` |
| 4 | C-1006 | `van der Berg` | `ANNA` | `Van Der Berg` | `Anna` |
| 5 | C-1008 | `martinez-LOPEZ` | `SOFIA` | `Martinez-Lopez` | `Sofia` |
| 6 | C-1013 | `DE LA CRUZ` | `miguel` | `De La Cruz` | `Miguel` |

- **Steps:**
  1. Show the messy names. Highlight the inconsistency.
  2. Click cell D2. Formula bar shows `=PROPER(B2)`.
  3. Result appears. Note: PROPER capitalizes first letter of EVERY word, which is usually right but not always (e.g., "Van Der Berg" — should it be "van der Berg"? "De La Cruz" — should it be "de la Cruz"?). **Call this out as a limitation.**
  4. Show UPPER and LOWER briefly: `=UPPER("maria")` → `MARIA`, `=LOWER("JOHNSON")` → `johnson`.
  5. Combine with TRIM: `=PROPER(TRIM(C2))` handles both problems at once. Show this as the "real" formula.
- **Teaching note to display:** "PROPER isn't perfect — it capitalizes every word, which doesn't work for names like 'McDonald' or 'van der Berg.' But it gets you 90% of the way there, and you can fix exceptions manually. Better than fixing every name manually."
- **Sandbox:** Text input. Three buttons: "Apply PROPER," "Apply UPPER," "Apply LOWER." Show result.

### 3. CONCATENATE / TEXTJOIN (Building text from parts)
- **What it does:** Combines text from multiple cells into one cell
- **Why lawyers need it:** Building case captions, full names, addresses, form letter merge fields
- **Demo data:**

| Row | A (First) | B (Last) | C (Full Name) | D (Opposing Party) | E (Case Caption) |
|-----|-----------|----------|---------------|--------------------|--------------------|
| 1 | Maria | Johnson | Maria Johnson | Acme Manufacturing, LLC | Johnson v. Acme Manufacturing, LLC |
| 2 | Roberto | Garcia | Roberto Garcia | State Farm Insurance Co. | Garcia v. State Farm Insurance Co. |
| 3 | Patrick | O'Brien | Patrick O'Brien | Columbus City Schools | O'Brien v. Columbus City Schools |
| 4 | Denise | Washington-Cole | Denise Washington-Cole | Nationwide Mutual Insurance | Washington-Cole v. Nationwide Mutual Insurance |

- **Steps:**
  1. Show first name and last name in separate columns.
  2. Click C2. Formula bar: `=A2 & " " & B2`. Result: full name. Explain the `&` operator and that `" "` adds a space.
  3. Alternative: `=CONCATENATE(A2, " ", B2)` — same result, different syntax.
  4. Build a case caption: `=B2 & " v. " & D2`. Show this is just string building.
  5. Show TEXTJOIN briefly for joining with a delimiter: `=TEXTJOIN(", ", TRUE, A2, B2, C2)` — useful when you have many columns.
- **Teaching note:** "This is how mail merge works under the hood. Every 'Dear [First Name]' letter is just concatenation."
- **Sandbox:** Two or three text input boxes (labeled "First Name," "Last Name," "Company"). Show the concatenated result in different formats: "First Last," "Last, First," "Last v. Company."

### 4. LEFT / MID / RIGHT (Extracting parts of text)
- **What it does:** Extracts characters from a specific position in text
- **Why lawyers need it:** Parsing docket numbers, extracting date components, pulling codes from case IDs
- **Demo data:**

| Row | A (Docket Number) | B (District) | C (Year) | D (Case Number) | E (Judge) |
|-----|-------------------|-------------|----------|-----------------|-----------|
| 1 | `2:25-cv-00341-ALM` | `2` | `25` | `00341` | `ALM` |
| 2 | `4:25-cv-01022-JRA` | `4` | `25` | `01022` | `JRA` |
| 3 | `2:24-cv-03891-EAS` | `2` | `24` | `03891` | `EAS` |
| 4 | `3:25-cv-00456-TMR` | `3` | `25` | `00456` | `TMR` |
| 5 | `1:24-cv-00789-DRC` | `1` | `24` | `00789` | `DRC` |
| 6 | `2:25-cv-01234-ALM` | `2` | `25` | `01234` | `ALM` |

- **Steps:**
  1. Show the docket numbers. Explain the structure: `[district]:[year]-cv-[number]-[judge]`.
  2. Extract district: `=LEFT(A2, 1)` — first 1 character. Highlight "LEFT means start from the left."
  3. Extract year: `=MID(A2, 3, 2)` — start at position 3, take 2 characters. Highlight the character positions visually (maybe number each character in the docket string).
  4. Extract judge initials: `=RIGHT(A2, 3)` — last 3 characters. Note: this only works because judge initials are always 3 characters. If they varied, you'd need a different approach.
  5. Extract case number: `=MID(A2, 9, 5)` — start at position 9, take 5 characters.
- **Visual aid:** Show the docket number with each character position numbered above it: `2 : 2 5 - c v - 0 0 3 4 1 - A L M` with position numbers `1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16`. This makes MID intuitive.
- **Teaching note:** "Docket numbers are structured data hiding inside text. Once you can parse them, you can sort by district, filter by year, or group by judge."
- **Sandbox:** Paste a docket number (or any text). Three buttons/options: "LEFT(n)," "MID(start, length)," "RIGHT(n)" with number inputs. Show the extracted result with the character positions highlighted.

### 5. Flash Fill (Pattern recognition)
- **What it does:** Excel detects a pattern from examples you type and fills the rest automatically
- **Why lawyers need it:** Quick extraction without writing formulas. Good for one-off cleanup tasks.
- **Demo data:** Same docket numbers as panel 4.
- **Steps:**
  1. Show the docket numbers in column A.
  2. In cell B2, type `ALM` (the judge initials from the first docket number).
  3. Select B2 through B7 (or just move to B3).
  4. Press Ctrl+E (or go to Data → Flash Fill).
  5. Excel fills in the rest: `JRA`, `EAS`, `TMR`, `DRC`, `ALM`.
  6. Show another example: type `District 2` in C2, Flash Fill → `District 4`, `District 2`, `District 3`, `District 1`, `District 2`.
- **Teaching note:** "Flash Fill is the magic trick. It won't work for everything, but when it works, it saves you from writing formulas entirely. Always check the results though — it's pattern matching, not understanding."
- **Note for the app:** This one is harder to make interactive since Flash Fill is an Excel-specific feature. The demo panel could animate it as a step-by-step. The sandbox could show a "pattern recognition" demo: user types one example, app guesses the rest. Or just show a short screen recording / animated GIF of Flash Fill in action and skip the sandbox for this one.

### 6. VLOOKUP / XLOOKUP (Looking up related data)
- **What it does:** Finds a value in one table and returns a corresponding value from another table
- **Why lawyers need it:** Matching data across different lists — client IDs to names, case numbers to statuses, attorney emails to full names, invoice numbers to amounts
- **Demo data (two tables shown side by side or stacked):**

**Table 1: Case List (partial)**

| Row | A (Case ID) | B (Client) | C (Attorney Email) | D (Attorney Name) | E (Hourly Rate) |
|-----|-------------|-----------|--------------------|--------------------|-----------------|
| 1 | C-1001 | Johnson | tchen@buckeyelaw.com | ? | ? |
| 2 | C-1002 | Garcia | jnakamura@buckeyelaw.com | ? | ? |
| 3 | C-1003 | O'Brien | smartinez@buckeyelaw.com | ? | ? |

**Table 2: Attorney Directory**

| Row | A (Email) | B (Full Name) | C (Bar Number) | D (Office) | E (Hourly Rate) |
|-----|-----------|--------------|----------------|-----------|-----------------|
| 1 | apatel@buckeyelaw.com | Anita Patel | OH-0098234 | Columbus - Main | $350 |
| 2 | jnakamura@buckeyelaw.com | James Nakamura | OH-0087651 | Columbus - Main | $425 |
| 3 | smartinez@buckeyelaw.com | Sofia Martinez | OH-0091478 | Columbus - Easton | $375 |
| 4 | tchen@buckeyelaw.com | Teresa Chen | OH-0095562 | Columbus - Main | $400 |

- **Steps:**
  1. Show both tables. "You have the attorney's email on the case list, but the partner wants to see the attorney's name. The name is on a different sheet."
  2. Click cell D2 in Table 1. Formula bar: `=VLOOKUP(C2, [Attorney Directory], 2, FALSE)`.
  3. Animate: highlight C2 ("this is what we're looking for"), highlight the Attorney Directory table ("this is where we're looking"), the `2` ("return the 2nd column — the name"), `FALSE` ("exact match only").
  4. Result: "Teresa Chen" appears.
  5. Hourly rate: `=VLOOKUP(C2, [Attorney Directory], 5, FALSE)` — same idea, different column number.
  6. Briefly mention XLOOKUP as the modern version: `=XLOOKUP(C2, [emails], [names])` — more readable, no column counting.
- **Visual aid:** When explaining the VLOOKUP arguments, use color-coded highlighting: the lookup value in blue, the table range in green, the return column highlighted in yellow.
- **Teaching note:** "VLOOKUP is probably the single most-used Excel function in law firm operations. Anytime you need to connect two lists that share a common field — client number, case ID, email address — VLOOKUP is the answer."
- **Sandbox:** Two small tables. User can change the lookup value (pick from a dropdown of emails) and the column number, and see the result update live.

### 7. COUNTIF Cross-Reference (Finding overlaps between lists)
- **What it does:** Counts how many times a value appears in a range. Combined with IF, it can flag whether a value exists on another list.
- **Why lawyers need it:** Comparing witness lists, finding duplicate parties, checking which items on one list appear on another
- **Demo data (two tables):**

**Plaintiff Witness List:**

| Row | A (Witness Name) | B (Role) | C (On Defense List?) |
|-----|-----------------|---------|---------------------|
| 1 | Dr. Sarah Mitchell | Expert - Medical | |
| 2 | Dr. Raj Gupta | Treating Physician | BOTH LISTS |
| 3 | Angela Washington-Cole | Plaintiff | BOTH LISTS |
| 4 | Robert Kim | Witness - Bystander | BOTH LISTS |
| 5 | Maria Johnson | Plaintiff | |
| 6 | Wei Chen | Plaintiff | BOTH LISTS |

**Defense Witness List:**

| Row | A (Witness Name) | B (Role) |
|-----|-----------------|---------|
| 1 | Dr. Michael Torres | Expert - Medical |
| 2 | Dr. Raj Gupta | Treating Physician |
| 3 | Officer James Miller | Arresting Officer |
| 4 | Robert Kim | Witness - Bystander |
| 5 | Angela Washington-Cole | Plaintiff (defense depo) |
| 6 | Wei Chen | Plaintiff (defense depo) |

- **Steps:**
  1. Show both lists. "Which witnesses are on both lists? These are the ones both sides want to depose — important for scheduling and strategy."
  2. Click C2 on the plaintiff list. Formula: `=IF(COUNTIF([Defense List], A2) > 0, "BOTH LISTS", "")`.
  3. Break it down: COUNTIF counts how many times the name appears in the defense list. If it's more than 0, the witness is on both lists.
  4. Copy down. Show results — 4 witnesses appear on both lists.
  5. "Now the partner can see at a glance which depositions need coordinated scheduling."
- **Teaching note:** "This is a building block for more complex analysis. The same pattern works for: which clients appear in both the old and new firm's databases? Which invoices haven't been paid? Which discovery documents were flagged by both reviewers?"
- **Sandbox:** Two text areas — paste a list in each one. Click "Find Overlaps." App highlights which items appear in both lists. Simple and immediately useful.

---

## Sandbox Panel Design

Each function's sandbox should be minimal — not a spreadsheet, just enough to try the concept:

- **Text input area(s)** — labeled clearly, pre-populated with example messy data but editable
- **"Apply" button** — labeled with the formula name (e.g., "Apply TRIM," "Apply PROPER")
- **Result display** — shows the cleaned/transformed output, visually distinct (maybe green background or bold)
- **For functions with parameters** (LEFT, MID, RIGHT): include small number inputs so students can change the start position or length and see different results
- **Copy button** on the result — so students can copy the formula syntax to use in Excel

---

## Visual Design

- **Color scheme:** Use OSU scarlet (#BA0C2F) as the accent color for headers and buttons, consistent with other course tools
- **Grid styling:** Should evoke Excel — light gray gridlines, white cell backgrounds, blue highlight for selected cells, green highlight for formula results
- **Formula bar:** Gray background (#f0f0f0), monospace font, "fx" icon on the left, just like Excel
- **Step indicators:** Clear step numbers ("Step 2 of 5") with Previous/Next buttons
- **Explanation text:** Below the grid, in a light background card. Short — 1-2 sentences per step. Conversational tone.
- **Teaching notes:** Styled as callout boxes (light yellow or blue background) with a lightbulb or info icon. These are the "why this matters for lawyers" context.
- **Mobile:** Should be usable on a phone for reference, but the primary design target is a laptop browser in a classroom.

---

## Navigation and Flow

- **Tab-based navigation** across the top — one tab per function, in teaching order (TRIM → PROPER → CONCATENATE → LEFT/MID/RIGHT → Flash Fill → VLOOKUP → COUNTIF)
- Each tab is self-contained — professor can skip around if needed, students can revisit any function
- **No required progression** — don't lock tabs or require completing one before moving to the next
- Within each tab, the demo walkthrough has Previous/Next step controls
- A small "Overview" or "Home" tab at the start with the scenario setup: "Buckeye Law Group just merged..."

---

## Scenario Text (for the Home/Overview tab)

> **Scenario: Cleaning Up After a Merger**
>
> Buckeye Law Group just merged with a smaller firm. Their case data has been combined into a single spreadsheet — but it's a mess. Names are in ALL CAPS or all lowercase. There are extra spaces everywhere. The docket numbers contain useful information (district, year, judge) but it's all crammed into one cell. And the case list only has attorney email addresses, not their names.
>
> Your supervising partner has a client meeting tomorrow and needs this data cleaned up. You could fix each cell by hand... or you could use formulas.
>
> Work through each tab to learn the formulas that will clean this data in seconds instead of hours.

---

## Data Notes

- All data is fictional but realistic for Ohio legal practice
- Company names are real Ohio companies (Kroger, Honda of America, Nationwide, OhioHealth, etc.) used in a fictional context
- Docket numbers follow real Southern District of Ohio formatting
- Attorney names and bar numbers are fictional
- The same data set threads through all demos for continuity — students see the same case list getting progressively cleaner

---

## Functions NOT included (and why)

- **IF / nested IF:** Covered in Procertas (COUNTIF, SUMIF). Students have seen conditional logic.
- **SUMIF / COUNTIF (basic):** Covered in Procertas Tasks 9-10.
- **Sort / Filter:** Covered in Procertas Task 5.
- **PivotTables:** Covered in Procertas Tasks 16-17.
- **INDEX/MATCH:** Too advanced for this audience. VLOOKUP is sufficient.
- **Regular expressions:** Not available in standard Excel. Skip.

---

## Deployment

- Static site, no backend required
- Host on Replit (consistent with other course tools: token-explorer, prompt-coach, hallucination-game) or Render (consistent with doc-tech-gallery)
- URL pattern: something like `excel-explorer.replit.app` or similar
- No authentication, no data persistence — everything runs client-side
