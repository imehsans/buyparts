import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple test component
function TestApp() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">Test Page</h1>
      <p className="text-gray-700 mt-4">If you see this, React is working!</p>
      <div className="mt-4 bg-green-100 p-4 rounded">
        <p className="text-green-800">Tailwind CSS is working!</p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
