import { Router } from "express";
import {
  createespecialidad,
  getall,
} from "../controllers/especialidad.controllers";
import { crear_especialidadschema } from "../schemas/especialidad.schemas";
import { validardatos } from "../middleware/validardatos";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = Router();

router.get(
  "/",
  verifyToken,
  getall,
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
);
router.post(
  "/",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  validardatos(crear_especialidadschema),
  createespecialidad /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);

export default router;
