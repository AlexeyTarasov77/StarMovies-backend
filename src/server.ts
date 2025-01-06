import express from "express"
import cors from "cors"
import { prisma } from "./prisma"
import { container } from './movies/container';


export const apiVersion = "1.0.0"
const app: express.Express = express()
const HOST = "127.0.0.1"
const PORT = 8000

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST']
}))

app.get('/genres/all', container.handlers.listGenres)

app.get('/data', (req, res) => {
  res.json({ message: 'This is a CORS-enabled response' })
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
