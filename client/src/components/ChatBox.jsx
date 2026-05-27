import { useEffect, useState } from 'react'
import API from '../services/api'
import Message from './Message'

export default function ChatBox({ selectedQuestion }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hola, soy el asistente inteligente del Estatuto Orgánico de la UASD. ¿En qué puedo ayudarte?'
    }
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async (customQuestion) => {
    const question = customQuestion || input

    if (!question.trim()) return

    const userMessage = {
      sender: 'user',
      text: question
    }

    setMessages(prev => [...prev, userMessage])

    setInput('')
    setLoading(true)

    try {
      const response = await API.post('/chat', {
        question
      })

      const botMessage = {
        sender: 'bot',
        text: response.data.answer
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.log(error)

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Ocurrió un error al procesar la solicitud.'
        }
      ])
    }

    setLoading(false)
  }

  useEffect(() => {
    if (selectedQuestion) {
      sendMessage(selectedQuestion)
    }
  }, [selectedQuestion])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <Message
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))}

        {loading && (
          <div className="text-slate-400 animate-pulse">
            Analizando Estatuto Orgánico...
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta aquí..."
          className="flex-1 p-4 rounded-xl bg-slate-800 text-white outline-none"
        />

        <button
          onClick={() => sendMessage()}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 rounded-xl"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}