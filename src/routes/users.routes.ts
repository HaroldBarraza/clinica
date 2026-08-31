import { Router } from "express";
import { getUsers } from "../controllers/users.controller";

const router:Router = Router()

router.get("/", getUsers)


export default router