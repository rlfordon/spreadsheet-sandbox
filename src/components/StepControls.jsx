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
