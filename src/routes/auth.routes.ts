import { Router } from "express";
import { register, login, actualizarPerfil,getMe } from "../controllers/auth.controller.js";
import { validardatos } from "../middleware/validardatos";
import { createuserschema } from "../schemas/user.schema.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../config/multer.js";

const router: Router = Router();

router.post("/register", validardatos(createuserschema), register);
router.post("/login", login);
router.put("/perfil", verifyToken, upload.single("foto"), actualizarPerfil);
router.get("/me", verifyToken, getMe);

export default router;
