import { useState, useEffect, useCallback } from 'react'
import FormulaBar from './FormulaBar'
import SpreadsheetGrid from './SpreadsheetGrid'
import StepControls from './StepControls'
import TeachingNote from './TeachingNote'

export default function DemoPanel({ config }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = config.steps[stepIndex]

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      setStepIndex(i => Math.max(0, i - 1))
    } else if (e.key === 'ArrowRight') {
      setStepIndex(i => Math.min(config.steps.length - 1, i + 1))
    }
  }, [config.steps.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

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
