import { useState } from 'react'
import FormulaBar from '../components/FormulaBar'
import StepControls from '../components/StepControls'
import TeachingNote from '../components/TeachingNote'
import CountifSandbox from '../components/sandboxes/CountifSandbox'
import { plaintiffWitnesses, defenseWitnesses } from '../data/countif'

const steps = [
  {
    formula: '',
    explanation: 'You have two witness lists — one from the plaintiff, one from the defense. Which witnesses appear on both lists? These are the ones both sides want to depose, important for scheduling and strategy.',
    teachingNote: null,
    showResults: false,
    highlightRow: null,
  },
  {
    formula: '=IF(COUNTIF([Defense List], A2) > 0, "BOTH LISTS", "")',
    explanation: 'Click cell C2 on the plaintiff list. We enter: =IF(COUNTIF([Defense List], A2) > 0, "BOTH LISTS", ""). COUNTIF counts how many times the name appears in the defense list. If more than 0, the witness is on both lists.',
    teachingNote: null,
    showResults: false,
    highlightRow: 0,
  },
  {
    formula: '=IF(COUNTIF([Defense List], A2) > 0, "BOTH LISTS", "")',
    explanation: 'Dr. Sarah Mitchell is NOT on the defense list — her cell stays empty. But Dr. Raj Gupta IS on both lists — "BOTH LISTS" appears.',
    teachingNote: null,
    showResults: true,
    revealCount: 2,
    highlightRow: null,
  },
  {
    formula: '=IF(COUNTIF([Defense List], A2) > 0, "BOTH LISTS", "")',
    explanation: 'Copy the formula down. Four witnesses appear on both lists: Dr. Gupta, Angela Washington-Cole, Robert Kim, and Wei Chen. The partner can now see which depositions need coordinated scheduling.',
    teachingNote: "This is a building block for more complex analysis. The same pattern works for: which clients appear in both the old and new firm's databases? Which invoices haven't been paid? Which discovery documents were flagged by both reviewers?",
    showResults: true,
    revealCount: 6,
    highlightRow: null,
  },
]

export default function CountifPanel() {
  const [stepIndex, setStepIndex] = useState(0)
  const step = steps[stepIndex]

  return (
    <div className="space-y-6">
      <div>
        <FormulaBar formula={step.formula} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Plaintiff Witness List */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Plaintiff Witness List</h3>
            <div className="border border-gray-400 rounded-sm overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-10 px-2 py-1.5 text-center text-xs text-gray-500 border-r border-b border-gray-300"></th>
                    <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">A</span>Witness Name</th>
                    <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">B</span>Role</th>
                    <th className="px-3 py-1.5 text-left font-semibold border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">C</span>On Defense List?</th>
                  </tr>
                </thead>
                <tbody>
                  {plaintiffWitnesses.map((w, i) => {
                    const showResult = step.showResults && step.revealCount > i
                    const isHighlighted = step.highlightRow === i
                    return (
                      <tr key={i}>
                        <td className="px-2 py-1.5 text-center text-xs text-gray-400 bg-gray-50 border-r border-b border-gray-200">{i + 2}</td>
                        <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono ${isHighlighted ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : 'bg-white'}`}>{w.name}</td>
                        <td className="px-3 py-1.5 border-r border-b border-gray-200 font-mono bg-white">{w.role}</td>
                        <td className={`px-3 py-1.5 border-b border-gray-200 font-mono transition-all duration-300 ${
                          showResult && w.onBoth ? 'bg-green-50' : 'bg-white'
                        }`}>
                          {showResult && w.onBoth && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">BOTH LISTS</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Defense Witness List */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Defense Witness List</h3>
            <div className="border border-gray-400 rounded-sm overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-10 px-2 py-1.5 text-center text-xs text-gray-500 border-r border-b border-gray-300"></th>
                    <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">A</span>Witness Name</th>
                    <th className="px-3 py-1.5 text-left font-semibold border-b border-gray-300"><span className="text-xs text-gray-400 mr-2">B</span>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {defenseWitnesses.map((w, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1.5 text-center text-xs text-gray-400 bg-gray-50 border-r border-b border-gray-200">{i + 2}</td>
                      <td className="px-3 py-1.5 border-r border-b border-gray-200 font-mono bg-white">{w.name}</td>
                      <td className="px-3 py-1.5 border-b border-gray-200 font-mono bg-white">{w.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
        <CountifSandbox />
      </div>
    </div>
  )
}
