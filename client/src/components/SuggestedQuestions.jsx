import { suggestedQuestions } from '../data/questions'

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="w-full lg:w-[350px] bg-slate-900 border-r border-slate-700 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-cyan-400">
        Preguntas sugeridas
      </h2>

      <div className="flex flex-col gap-3">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="bg-slate-800 hover:bg-slate-700 transition p-3 rounded-xl text-left"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}