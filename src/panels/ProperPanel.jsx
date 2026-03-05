import DemoPanel from '../components/DemoPanel'
import ProperSandbox from '../components/sandboxes/ProperSandbox'
import { properConfig } from '../data/proper'

export default function ProperPanel() {
  return (
    <div className="space-y-6">
      <DemoPanel config={properConfig} />
      <div className="border-t border-gray-200 pt-6">
        <ProperSandbox />
      </div>
    </div>
  )
}
