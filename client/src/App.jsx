import { useState } from 'react'
import Navbar from './components/Navbar'
import SuggestedQuestions from './components/SuggestedQuestions'
import ChatBox from './components/ChatBox'

function App() {
  const [selectedQuestion, setSelectedQuestion] = useState('')

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <SuggestedQuestions onSelect={setSelectedQuestion} />

        <ChatBox selectedQuestion={selectedQuestion} />
      </div>
    </div>
  )
}

export default App