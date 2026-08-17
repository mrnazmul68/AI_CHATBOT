import express, { Router } from "express"
import { route } from "./routes/routes.js"
import cors from "cors"
 
export const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api", route)