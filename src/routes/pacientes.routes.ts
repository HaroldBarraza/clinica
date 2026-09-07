import { Router } from "express";
import {
  allpacientes,
  createpacientes,
  findbyid,
  updatepaciente,
  getPacienteCitas,
} from "../controllers/pacientes.controllers";
import {
  crear_pacienteschema,
  updatepacienteschema,
} from "../schemas/pacientes.schemas";
import { validardatos } from "../middleware/validardatos";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = Router();

router.get(
  "/",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  allpacientes /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.get(
  "/:id",
  verifyToken,
  findbyid /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.post(
  "/",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  validardatos(crear_pacienteschema),
  createpacientes /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.put(
  "/:id",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  validardatos(updatepacienteschema),
  updatepaciente,
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
);
router.get(
  "/:id/citas",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA", "MEDICO"),
  getPacienteCitas,
  /* #swagger.security = [{ "bearerAuth": [] }] */
);

export default router;
