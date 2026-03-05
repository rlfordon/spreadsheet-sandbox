import DemoPanel from '../components/DemoPanel'
import ConcatenateSandbox from '../components/sandboxes/ConcatenateSandbox'
import { concatenateConfig } from '../data/concatenate'

export default function ConcatenatePanel() {
  return (
    <div className="space-y-6">
      <DemoPanel config={concatenateConfig} />
      <div className="border-t border-gray-200 pt-6">
        <ConcatenateSandbox />
      </div>
    </div>
  )
}
