import { Router } from "express";
import { getallestado_citas } from "../controllers/estado_citas.controllers";

const router:Router = Router()

router.get("/", getallestado_citas)

export default router