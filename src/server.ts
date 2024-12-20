import express from "express"
import { Pool } from 'pg'
import { createContainer } from './movies/container'
import router from "./core/router"

const app: express.Express = express()
const HOST = "127.0.0.1";
const PORT = 8000;

const db = new Pool({
  user: 'user',
  database: 'db-name',
  password: 'password',
  port: 8000,
})

const container = createContainer(db)
export const apiVersion = "1.0.0"

app.use("/api/v1", router)

app.listen(PORT, HOST, () => {
  console.log("Server is running on http://127.0.0.1:8000")
})
