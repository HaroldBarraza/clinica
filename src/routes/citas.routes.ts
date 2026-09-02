import { Router } from "express";
import { getall } from "../controllers/citas.controllers";

const router:Router = Router()

router.get("/", getall)

export default router