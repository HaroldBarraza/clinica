import { Router } from "express";
import { getall } from "../controllers/especialidad.controllers";

const router:Router = Router()

router.get("/", getall)


export default router