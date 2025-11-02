import express from "express";
import cors from "cors";
import pistonRouter from "./pistonRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsConfig = {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ['GET', 'PUT', 'POST'],
};

app.use(express.json());
app.use(cors(corsConfig));
app.use("/piston", pistonRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
