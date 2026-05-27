import axios from 'axios'

const API = axios.create({
  baseURL: 'https://tu-url-render.onrender.com'
})

export default API