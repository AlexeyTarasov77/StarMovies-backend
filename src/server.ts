import express from "express";
import cors from "cors";
import router from "./core/router";
import { errorHandler } from "./core/http-errors";

export const apiVersion = "1.0.0";
const app: express.Express = express();
const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }),
);

app.use("/api/v1", router);
app.use(errorHandler);



app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
