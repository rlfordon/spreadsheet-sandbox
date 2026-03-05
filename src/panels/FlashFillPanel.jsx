import { useState, useEffect, useCallback } from 'react'
import FormulaBar from '../components/FormulaBar'
import StepControls from '../components/StepControls'
import TeachingNote from '../components/TeachingNote'
import FlashFillSandbox from '../components/sandboxes/FlashFillSandbox'
import { flashFillDockets, flashFillExamples } from '../data/flashfill'

const steps = [
  {
    formula: '',
    explanation: 'Flash Fill is Excel\'s pattern recognition feature. You type one example of what you want, and Excel figures out the pattern and fills the rest. Let\'s extract judge initials from these docket numbers.',
    teachingNote: null,
    exampleIndex: 0,
    showTyped: false,
    animate: false,
  },
  {
    formula: '',
    explanation: 'In cell B2, we type "ALM" \u2014 the judge initials from the first docket number. This is our example for Excel to learn from.',
    teachingNote: null,
    exampleIndex: 0,
    showTyped: true,
    animate: false,
  },
  {
    formula: 'Ctrl+E (Flash Fill)',
    explanation: 'Select B2 through B7 and press Ctrl+E (or go to Data \u2192 Flash Fill). Excel detects the pattern and fills in the rest: JRA, EAS, TMR, DRC, ALM.',
    teachingNote: null,
    exampleIndex: 0,
    showTyped: true,
    animate: true,
  },
  {
    formula: 'Ctrl+E (Flash Fill)',
    explanation: 'Another example: type "District 2" in C2. Flash Fill produces "District 4," "District 2," "District 3," etc. It recognized you wanted "District " followed by the first character.',
    teachingNote: "Flash Fill is the magic trick. It won't work for everything, but when it works, it saves you from writing formulas entirely. Always check the results though \u2014 it's pattern matching, not understanding.",
    exampleIndex: 1,
    showTyped: true,
    animate: true,
  },
]

export default function FlashFillPanel() {
  const [stepIndex, setStepIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const step = steps[stepIndex]
  const example = flashFillExamples[step.exampleIndex]

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

  // Reset and animate when step changes
  useEffect(() => {
    setVisibleCount(0)
    if (step.animate) {
      let count = 1 // start from row 2 (index 1) since row 1 is the typed example
      const interval = setInterval(() => {
        count++
        setVisibleCount(count)
        if (count >= flashFillDockets.length) clearInterval(interval)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [stepIndex])

  return (
    <div className="space-y-6">
      <div>
        <FormulaBar formula={step.formula} />

        {/* Custom grid */}
        <div className="border border-gray-400 rounded-sm overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-10 px-2 py-1.5 text-center text-xs text-gray-500 border-r border-b border-gray-300"></th>
                <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300 bg-gray-100">
                  <span className="text-xs text-gray-400 mr-2">A</span>Docket Number
                </th>
                <th className="px-3 py-1.5 text-left font-semibold border-r border-b border-gray-300 bg-gray-100">
                  <span className="text-xs text-gray-400 mr-2">B</span>{example.label}
                </th>
              </tr>
            </thead>
            <tbody>
              {flashFillDockets.map((docket, i) => {
                const showValue = (i === 0 && step.showTyped) || (step.animate && i < visibleCount)
                const isTyped = i === 0 && step.showTyped
                return (
                  <tr key={i}>
                    <td className="px-2 py-1.5 text-center text-xs text-gray-400 bg-gray-50 border-r border-b border-gray-200">
                      {i + 2}
                    </td>
                    <td className="px-3 py-1.5 border-r border-b border-gray-200 font-mono bg-white">
                      {docket}
                    </td>
                    <td className={`px-3 py-1.5 border-r border-b border-gray-200 font-mono transition-all duration-300 ${
                      showValue
                        ? isTyped ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : 'bg-green-50'
                        : 'bg-white'
                    }`}>
                      {showValue ? example.results[i] : ''}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
        <FlashFillSandbox />
      </div>
    </div>
  )
}
