import express, {Express, Request, Response} from 'express'
import {healthcheckHandler} from './core/handlers'
import path from "path"

const app : Express = express()
const HOST = '127.0.0.1' 
const PORT = 8000

export const version = "1.0.0"

//обработчик healthcheckHandler будет обрабатывать маршрут по адресу /api/v1/healthcheck
app.get('/api/v1/healthcheck', healthcheckHandler)

app.use("/static/", express.static(path.resolve(__dirname, "./static")))
app.use(express.json())



// app.listen(PORT,HOST,()=>{
//     console.log("Server is running on http://127.0.0.1:8000")
// })