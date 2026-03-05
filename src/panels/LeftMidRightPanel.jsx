import DemoPanel from '../components/DemoPanel'
import LeftMidRightSandbox from '../components/sandboxes/LeftMidRightSandbox'
import { leftMidRightConfig } from '../data/leftmidright'

export default function LeftMidRightPanel() {
  return (
    <div className="space-y-6">
      <DemoPanel config={leftMidRightConfig} />
      <div className="border-t border-gray-200 pt-6">
        <LeftMidRightSandbox />
      </div>
    </div>
  )
}
