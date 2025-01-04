import express from "express"
import cors from "cors"

const app: express.Express = express()
const HOST = "127.0.0.1"
const PORT = 8000

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST']
}))

const films = [
  {
    name: "MARYJA",
    contry: "Ukraine",
    year: 2004,
    genre: "Scientific",
    img_url:
      "https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABRdhYCqzX-94fs5A5y0llZYgMmWSgGxs7CbCJ9P8g8zL2m2hFfeQdL_PBQcSnH7Sd0DJ5TtYNox0Ot5FY0GUL29KT0GFrX8XLFxKJexH4Kgu3Q64Wac5HRJnvyfqdQ8nP1goSA.jpg?r=081",
    id: 5,
  },
  {
    name: "EMILY W PARYŻU",
    contry: "Ukraine",
    year: 2004,
    genre: "Triller",
    img_url:
      "https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABaDviQt3GtbapePGifGiYqxtj2-wQJo9bVMooXyxUmyURveGdsTi59blEXy7WCJ3EQCiTzZaMG6Rr2bPID4TFfS4Q_u04YeffrXvlwL89XLSePP5mSijxI27yDEXgFSxO9dL2Q.jpg?r=87b",
    id: 6,
  },
]

app.get('/films/all', (req, res) => {
  res.json(films)
})

const genres = [
  { id: 1, name: 'Scientific' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Drama' },
  { id: 4, name: 'Triller' },
]

app.get('/genres/all', (req, res) => {
  res.json(genres)
})


app.get('/data', (req, res) => {
  res.json({ message: 'This is a CORS-enabled response' })
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
