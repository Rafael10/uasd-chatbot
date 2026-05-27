require('dotenv').config()

const express = require('express')
const cors = require('cors')
const OpenAI = require('openai')

const {
  loadPDF,
  searchRelevantContent
} = require('./services/pdfService')

const app = express()

app.use(cors())
app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
})

loadPDF()

app.post('/chat', async (req, res) => {
  try {
    const { question } = req.body

    const context = searchRelevantContent(question)

if (!context || context.trim().length < 50) {
  return res.json({
    answer:
      'No encontré información específica sobre eso en el Estatuto Orgánico de la UASD.'
  })
}

const prompt = `
Eres un chatbot especializado EXCLUSIVAMENTE en el Estatuto Orgánico de la UASD.

Responde usando SOLAMENTE el contexto proporcionado del Estatuto Orgánico de la UASD.

Si el contexto contiene información relacionada, debes responder normalmente.

NO digas automáticamente que no encontraste información si el contexto sí contiene datos relacionados.

Debes:
- responder claro
- responder breve
- responder formalmente
- evitar inventar información

Contexto:
${context}

Pregunta:
${question}
`

    const completion = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 0.2
    })

    const answer = completion.choices[0].message.content

    res.json({ answer })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      error: 'Error interno del servidor'
    })
  }
})

app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000')
})