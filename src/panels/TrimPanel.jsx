import DemoPanel from '../components/DemoPanel'
import TrimSandbox from '../components/sandboxes/TrimSandbox'
import { trimConfig } from '../data/trim'

export default function TrimPanel() {
  return (
    <div className="space-y-6">
      <DemoPanel config={trimConfig} />
      <div className="border-t border-gray-200 pt-6">
        <TrimSandbox />
      </div>
    </div>
  )
}
