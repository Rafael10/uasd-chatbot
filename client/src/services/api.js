import axios from 'axios'

const API = axios.create({
  baseURL: 'https://uasd-chatbot-huyc.onrender.com'
})

export default API