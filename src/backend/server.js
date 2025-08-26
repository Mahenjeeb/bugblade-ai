import express from "express";
import cors from "cors";
import pistonRouter from "./pistonRouter.js"

const app = express();
const corsConfig = {
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST'],
}

app.use(express.json());
app.use(cors(corsConfig))
app.use("/piston",pistonRouter)

app.listen(5000,()=> {
 console.log("Server running on port 5000");
})
