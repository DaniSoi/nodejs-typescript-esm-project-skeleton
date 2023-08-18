import { Router } from "express"

import { HomeController } from "../components/home/home.controller.js"

const router = Router()

router.get("/", HomeController.getAppInfo)

export default router
