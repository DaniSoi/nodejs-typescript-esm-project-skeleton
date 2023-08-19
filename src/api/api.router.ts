import { Router } from "express"

import homeRouter from "./home/home.router.js"

const router = Router()

router.use("/home", homeRouter)

export default router
