import express, {Express, Request, Response} from 'express'
import path from "path"

const app : Express = express()


const HOST = '127.0.0.1' 
const PORT = 8000

app.use("/static/", express.static(path.resolve(__dirname, "./static")))
app.use(express.json())

app.get("/",(req : Request,res: Response) => {
    res.render('index')
})


app.listen(PORT,HOST,()=>{
    console.log("Server is running on http://127.0.0.1:8000")
})