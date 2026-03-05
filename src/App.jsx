import { useState } from 'react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto p-6">
        <p className="text-gray-400">Active: {activeTab}</p>
      </main>
    </div>
  )
}

export default App
