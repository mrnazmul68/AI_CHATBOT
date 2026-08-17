import express, { Router } from "express";
import { route } from "./routes/routes.js";
import cors from "cors";

export const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running successfully" });
});

app.use("/api", route);
