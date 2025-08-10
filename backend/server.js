import express from "express";
import dotenv from "dotenv";
import aiCodeReviewerRouter from "./router/aiCodeReviewerRouter.js"
import cors from "cors"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

app.use("/api", aiCodeReviewerRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`)
)