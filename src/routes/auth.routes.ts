import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validardatos } from "../middleware/validardatos";
import { createuserschema } from "../schemas/user.schema.js";

const router: Router = Router();

router.post("/register",validardatos(createuserschema) ,register) ;
router.post("/login", login);

export default router;
