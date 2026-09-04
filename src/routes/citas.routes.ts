import { Router } from "express";
import {
  createCita,
  filterdocto,
  filterforboss,
  filtrarestado,
  filtrosestadoresporte,
  getall,
  updateestado,
} from "../controllers/citas.controllers";
import {
  crear_cita,
  filtrardoctorschema,
  filtrarestadoschema,
  filterforbossschema,
  updateestadoschema,
  repoteestadoschema,
} from "../schemas/citas.schemas";
import { validardatos } from "../middleware/validardatos";
import { validardatosquery } from "../middleware/validatequery";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = Router();

router.get(
  "/doctor",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA","MEDICO"),
/*   validardatosquery(filtrardoctorschema), */
  filterdocto,
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
);
router.get(
  "/boss",
  verifyToken,
  authorize("GERENCIA"),
/*   validardatosquery(filterforbossschema), */
  filterforboss /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.get(
  "/estado",
  verifyToken,
  authorize("GERENCIA"),
/*   validardatosquery(filtrarestadoschema), */
  filtrarestado /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.get(
  "/",
  verifyToken,
  getall /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.post(
  "/",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  validardatos(crear_cita),
  createCita /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);

router.put(
  "/:id",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  validardatos(updateestadoschema),
  updateestado,
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
);

router.get(
  "/reporte",
  verifyToken,
  authorize("GERENCIA"),
/*   validardatosquery(repoteestadoschema), */
  filtrosestadoresporte,
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
);

export default router;
