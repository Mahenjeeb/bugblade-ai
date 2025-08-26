import express from "express";
import { availableRunTime, executeCode } from "./piston-controller.js";
const router = express.Router();
router.get("/runtime", availableRunTime);
router.post("/execute", executeCode);
export default router;
