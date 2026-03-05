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
