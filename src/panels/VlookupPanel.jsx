import { useState, useEffect, useCallback } from 'react'
import FormulaBar from '../components/FormulaBar'
import StepControls from '../components/StepControls'
import TeachingNote from '../components/TeachingNote'
import VlookupSandbox from '../components/sandboxes/VlookupSandbox'
import { caseList, attorneyDirectory } from '../data/vlookup'

const steps = [
  {
    formula: '',
    explanation: 'You have the attorney\'s email on the case list (Table 1), but the partner wants to see the attorney\'s full name. The name is in the Attorney Directory (Table 2). VLOOKUP connects them.',
    teachingNote: null,
    showResults: false,
    showRates: false,
    highlightLookup: false,
    highlightTable: false,
    highlightReturnCol: null,
  },
  {
    formula: '=VLOOKUP(C2, [Attorney Directory], 2, FALSE)',
    explanation: 'Click cell D2 in the case list. We enter =VLOOKUP(C2, [Attorney Directory], 2, FALSE). This says: "Find the value in C2 (the email), look it up in the Attorney Directory, and return column 2 (the name)."',
    teachingNote: null,
    showResults: false,
    showRates: false,
    highlightLookup: true,
    highlightTable: false,
    highlightReturnCol: null,
  },
  {
    formula: '=VLOOKUP(C2, [Attorney Directory], 2, FALSE)',
    explanation: 'Breaking it down: C2 (blue) is what we\'re looking for. The Attorney Directory (green) is where we\'re looking. Column 2 (yellow) is what we want back. FALSE means exact match only.',
    teachingNote: null,
    showResults: false,
    showRates: false,
    highlightLookup: true,
    highlightTable: true,
    highlightReturnCol: 'name',
  },
  {
    formula: '=VLOOKUP(C2, [Attorney Directory], 2, FALSE)',
    explanation: 'Result: "Teresa Chen" appears in D2. VLOOKUP found "tchen@buckeyelaw.com" in the first column of the Attorney Directory and returned the name from column 2.',
    teachingNote: null,
    showResults: true,
    showRates: false,
    highlightLookup: false,
    highlightTable: false,
    highlightReturnCol: null,
  },
  {
    formula: '=VLOOKUP(C2, [Attorney Directory], 5, FALSE)',
    explanation: 'For hourly rates, same pattern: =VLOOKUP(C2, [Attorney Directory], 5, FALSE). Column 5 is the rate column. "Teresa Chen" bills at $400/hour.',
    teachingNote: "VLOOKUP is probably the single most-used Excel function in law firm operations. Anytime you need to connect two lists that share a common field — client number, case ID, email address — VLOOKUP is the answer.",
    showResults: true,
    showRates: true,
    highlightLookup: false,
    highlightTable: false,
    highlightReturnCol: null,
  },
  {
    formula: '=XLOOKUP(C2, [emails], [names])',
    explanation: 'XLOOKUP is the modern version: =XLOOKUP(C2, [emails], [names]). More readable — no column counting. Use XLOOKUP if your version of Excel supports it (Excel 365/2021+).',
    teachingNote: null,
    showResults: true,
    showRates: true,
    highlightLookup: false,
    highlightTable: false,
    highlightReturnCol: null,
  },
]

export default function VlookupPanel() {
  const [stepIndex, setStepIndex] = useState(0)
  const step = steps[stepIndex]

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      setStepIndex(i => Math.max(0, i - 1))
    } else if (e.key === 'ArrowRight') {
      setStepIndex(i => Math.min(steps.length - 1, i + 1))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="space-y-6">
      <div>
        <FormulaBar formula={step.formula} />

        {/* Table 1: Case List */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Table 1: Case List</h3>
          <div className="border border-gray-400 rounded-sm overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-10 px-2 py-1.5 text-center text-xs text-gray-500 border-r border-b border-gray-300"></th>
                  <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">A</span>Case ID</th>
                  <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">B</span>Client</th>
                  <th className={`px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300 ${step.highlightLookup ? 'bg-blue-100' : ''}`}>
                    <span className="text-xs text-gray-400 mr-2">C</span>Attorney Email
                  </th>
                  <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">D</span>Attorney Name</th>
                  <th className="px-3 py-1.5 text-left font-semibold border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">E</span>Hourly Rate</th>
                </tr>
              </thead>
              <tbody>
                {caseList.map((row, i) => (
                  <tr key={i}>
                    <td className="px-2 py-1.5 text-center text-xs text-gray-400 bg-gray-50 border-r border-b border-gray-200">{i + 2}</td>
                    <td className="px-3 py-1.5 border-r border-b border-gray-200 font-mono bg-white">{row.caseId}</td>
                    <td className="px-3 py-1.5 border-r border-b border-gray-200 font-mono bg-white">{row.client}</td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono ${
                      step.highlightLookup && i === 0 ? 'bg-blue-100 ring-2 ring-blue-400 ring-inset' : 'bg-white'
                    }`}>{row.email}</td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono transition-all duration-300 ${
                      step.showResults ? 'bg-green-50' : 'bg-white'
                    }`}>{step.showResults ? row.name : '?'}</td>
                    <td className={`px-3 py-1.5 border-b border-gray-200 font-mono transition-all duration-300 ${
                      step.showRates ? 'bg-green-50' : 'bg-white'
                    }`}>{step.showRates ? row.rate : '?'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Attorney Directory */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Table 2: Attorney Directory</h3>
          <div className={`border rounded-sm overflow-x-auto ${step.highlightTable ? 'border-green-400 ring-2 ring-green-300' : 'border-gray-400'}`}>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className={step.highlightTable ? 'bg-green-50' : 'bg-gray-100'}>
                  <th className="w-10 px-2 py-1.5 text-center text-xs text-gray-500 border-r border-b border-gray-300"></th>
                  <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">A</span>Email</th>
                  <th className={`px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300 ${step.highlightReturnCol === 'name' ? 'bg-yellow-100' : ''}`}>
                    <span className="text-xs text-gray-400 mr-2">B</span>Full Name
                  </th>
                  <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">C</span>Bar Number</th>
                  <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">D</span>Office</th>
                  <th className="px-3 py-1.5 text-left font-semibold border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">E</span>Hourly Rate</th>
                </tr>
              </thead>
              <tbody>
                {attorneyDirectory.map((row, i) => (
                  <tr key={i}>
                    <td className="px-2 py-1.5 text-center text-xs text-gray-400 bg-gray-50 border-r border-b border-gray-200">{i + 2}</td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono ${step.highlightTable ? 'bg-green-50' : 'bg-white'}`}>{row.email}</td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono ${
                      step.highlightReturnCol === 'name' ? 'bg-yellow-100' : step.highlightTable ? 'bg-green-50' : 'bg-white'
                    }`}>{row.name}</td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono ${step.highlightTable ? 'bg-green-50' : 'bg-white'}`}>{row.bar}</td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono ${step.highlightTable ? 'bg-green-50' : 'bg-white'}`}>{row.office}</td>
                    <td className={`px-3 py-1.5 border-b border-gray-200 font-mono ${step.highlightTable ? 'bg-green-50' : 'bg-white'}`}>{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 p-3 bg-white rounded border border-gray-200 text-sm text-gray-700">
          {step.explanation}
        </div>
        {step.teachingNote && <TeachingNote>{step.teachingNote}</TeachingNote>}
        <StepControls
          currentStep={stepIndex + 1}
          totalSteps={steps.length}
          onPrev={() => setStepIndex(i => Math.max(0, i - 1))}
          onNext={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <VlookupSandbox />
      </div>
    </div>
  )
}
