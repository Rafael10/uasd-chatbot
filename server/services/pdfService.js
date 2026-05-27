const fs = require('fs')
const pdfParse = require('pdf-parse')

let chunks = []

async function loadPDF() {
  try {
    const dataBuffer = fs.readFileSync(
      './estatuto/ESTATUTO-ORGANICO-UASD.pdf'
    )

    const data = await pdfParse(dataBuffer)

    const text = data.text

    chunks = text
      .replace(/\\s+/g, ' ')
      .split('. ')
      .filter(chunk => chunk.length > 80 && chunk.length < 500)

    console.log('PDF cargado correctamente')
    console.log('Chunks cargados:', chunks.length)
  } catch (error) {
    console.log('Error cargando PDF:', error)
  }
}

function cleanQuestion(question) {
  const stopWords = [
    'que',
    'qué',
    'es',
    'el',
    'la',
    'los',
    'las',
    'un',
    'una',
    'sobre',
    'cuales',
    'cuáles',
    'del',
    'de',
    'y',
    'en'
  ]

  return question
    .toLowerCase()
    .replace(/[¿?]/g, '')
    .split(' ')
    .filter(word => !stopWords.includes(word))
}

function searchRelevantContent(question) {
  const keywords = cleanQuestion(question)

  const scoredChunks = chunks.map(chunk => {
    let score = 0

    keywords.forEach(keyword => {
      if (chunk.toLowerCase().includes(keyword)) {
        score += 5
      }
    })

    return {
      chunk,
      score
    }
  })

  const relevantChunks = scoredChunks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.chunk)

  return relevantChunks.join(' ')
}

module.exports = {
  loadPDF,
  searchRelevantContent
}