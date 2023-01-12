import express from "express"
import { router } from "./api/routes"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/", router)

app.listen(5000)
