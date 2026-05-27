export default function Message({ sender, text }) {
  const isUser = sender === 'user'

  return (
    <div
      className={`w-full flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl shadow-lg whitespace-pre-wrap ${
          isUser
            ? 'bg-cyan-500 text-black'
            : 'bg-slate-800 text-white'
        }`}
      >
        {text}
      </div>
    </div>
  )
}