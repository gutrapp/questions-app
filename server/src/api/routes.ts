import express from "express"
import { QuestionRouter } from "./controller/question"
import { AnswerRouter } from "./controller/answer"

const router = express.Router()

router.use("/api", QuestionRouter)
router.use("/api", AnswerRouter)

export { router }