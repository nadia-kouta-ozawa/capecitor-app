import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="hover:opacity-80 transition-opacity">
            <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
            <img src={reactLogo} className="w-16 h-16 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Vite + React 
        </h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            count is {count}
          </button>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Edit <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
