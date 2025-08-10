import express from "express"
const router = express.Router();
import {reviewCode} from "../controller/code-review-controller.js"
router.post("/review", reviewCode)
export default router