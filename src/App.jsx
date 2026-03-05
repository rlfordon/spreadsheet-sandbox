import { useState } from 'react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import HomePanel from './panels/HomePanel'
import TrimPanel from './panels/TrimPanel'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'home' && <HomePanel />}
        {activeTab === 'trim' && <TrimPanel />}
        {activeTab !== 'home' && activeTab !== 'trim' && (
          <p className="text-gray-400">Panel: {activeTab} (coming soon)</p>
        )}
      </main>
    </div>
  )
}

export default App
